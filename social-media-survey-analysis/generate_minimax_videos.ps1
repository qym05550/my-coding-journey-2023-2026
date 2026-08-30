param(
  [Parameter(Mandatory=$true)][string]$WordsPath,
  [string]$OutDir = ".\clips",  # NOTE: original default was a personal local folder (removed before publishing)
  [string]$CreateUrl = "https://platform.minimax.io/v1/video-generation/fl2v", # TODO: تأكد من المسار من التوثيق
  [string]$GetUrl = "https://platform.minimax.io/v1/video-generation/tasks/{TASK_ID}" # TODO: تأكد من المسار من التوثيق
)

# يتطلب: وضع مفتاح Minimax في متغير البيئة MINIMAX_API_KEY قبل التشغيل
$API_KEY = $env:MINIMAX_API_KEY
if (-not $API_KEY -or !$API_KEY.Trim()) { Write-Error "عيّن متغير البيئة MINIMAX_API_KEY أولاً"; exit 1 }
if (-not (Test-Path $WordsPath)) { Write-Error "ملف الكلمات غير موجود: $WordsPath"; exit 1 }

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

function SanitizeName([string]$s) {
  if (-not $s) { return "clip" }
  $s = $s.Trim()
  $s = [regex]::Replace($s, "[^\p{L}0-9 _-]", "")
  $s = [regex]::Replace($s, "\s+", "_")
  $s = [regex]::Replace($s, "_+", "_")
  if ([string]::IsNullOrWhiteSpace($s)) { return "clip" }
  return $s
}

# بعض خدمات API تستخدم Authorization: Bearer، وأخرى X-API-Key. فعّل السطر المناسب بحسب التوثيق.
$headers = @{
  Authorization = "Bearer $API_KEY"
  'Content-Type' = 'application/json'
}
# $headers = @{ 'X-Api-Key' = $API_KEY; 'Content-Type' = 'application/json' }

$words = Get-Content -LiteralPath $WordsPath | Where-Object { $_ -and $_.Trim().Length -gt 0 }
if (-not $words -or $words.Count -eq 0) { Write-Error "لا توجد كلمات في الملف: $WordsPath"; exit 1 }

[int]$index = 0
foreach ($w in $words) {
  $index++
  $prompt = $w.Trim()
  $safe = SanitizeName($prompt)
  $outFile = Join-Path $OutDir ($safe + ".mp4")

  Write-Host "[${index}/${($words.Count)}] إنشاء فيديو للكلمة: $prompt"

  # اضبط الحمولة حسب التوثيق (الحقول أدناه أمثلة شائعة)
  $bodyObj = [ordered]@{
    prompt = $prompt
    # model = "video-generation-fl2v"
    # duration = 3
    # size = "720x720"
    # seed = 0
    # guidance_scale = 7.5
  }
  $body = $bodyObj | ConvertTo-Json -Depth 10

  try {
    $createResp = Invoke-RestMethod -Method POST -Uri $CreateUrl -Headers $headers -Body $body -TimeoutSec 600
  } catch {
    Write-Warning "فشل طلب الإنشاء للكلمة '$prompt': $($_.Exception.Message)"; continue
  }

  # استخرج مُعرّف المهمة وفقاً للتوثيق
  $taskId = $createResp.task_id
  if (-not $taskId) { $taskId = $createResp.id }
  if (-not $taskId) { Write-Warning "لم يتم العثور على task_id للكلمة '$prompt'"; continue }

  # الاستطلاع حتى الجاهزية
  $maxWaitSec = 900
  $sleepSec = 3
  $elapsed = 0
  $status = "pending"
  $videoUrl = $null

  while ($elapsed -lt $maxWaitSec) {
    $pollUrl = $GetUrl -replace "{TASK_ID}", [regex]::Escape($taskId)
    try {
      $st = Invoke-RestMethod -Method GET -Uri $pollUrl -Headers $headers -TimeoutSec 600
    } catch {
      Write-Warning "فشل الاستعلام عن المهمة '$taskId': $($_.Exception.Message)"; break
    }

    $status = $st.status
    if (-not $status) { $status = $st.data.status }

    if ($status -in @('succeeded','success','completed','done')) {
      $videoUrl = $st.output_url
      if (-not $videoUrl) { $videoUrl = $st.result.video_url }
      if (-not $videoUrl -and $st.output -and $st.output.url) { $videoUrl = $st.output.url }
      break
    }
    elseif ($status -in @('failed','error','canceled')) {
      Write-Warning "فشلت المهمة '$taskId' للكلمة '$prompt' بحالة: $status"
      break
    }

    Start-Sleep -Seconds $sleepSec
    $elapsed += $sleepSec
  }

  if (-not $videoUrl) {
    Write-Warning "لم يتم الحصول على رابط فيديو للكلمة '$prompt' (الحالة: $status)"
    continue
  }

  try {
    Invoke-WebRequest -Uri $videoUrl -OutFile $outFile -UseBasicParsing
    Write-Host "تم الحفظ: $outFile"
  } catch {
    Write-Warning "فشل تنزيل الفيديو للكلمة '$prompt': $($_.Exception.Message)"
  }
}

Write-Host "اكتمل التوليد. المقاطع في: $OutDir"
