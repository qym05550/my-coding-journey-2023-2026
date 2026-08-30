// عدد الأسئلة المختارة في كل اختبار
const TOTAL_QUESTIONS = 5;

// أسئلة الاختبار
let allQuestions = [
  { q: 'أي كلمة سر أقوى؟', options: ['123456', 'Jk#92_kL', 'password123'], answer: 1 },
  { q: 'ما أفضل حماية لحسابك؟', options: ['نفس كلمة السر لكل موقع', 'التحقق بخطوتين', 'عدم تحديث البرامج'], answer: 1 },
  { q: 'أي عبارة صحيحة عن الروابط؟', options: ['اضغط على كل رابط', 'افحص الروابط قبل الضغط', 'روابط البريد آمنة دائماً'], answer: 1 },
  { q: 'هل مشاركة كلمة السر آمنة؟', options: ['نعم', 'لا', 'أحياناً'], answer: 1 },
  { q: 'أفضل طريقة لتذكر كلمة السر؟', options: ['كتابة على ورقة', 'استخدام مدير كلمات السر', 'تكرار نفس الكلمة'], answer: 1 },
  { q: 'تحديث البرامج مهم؟', options: ['نعم', 'لا', 'حسب الحاجة'], answer: 0 },
  { q: 'التأكد من روابط البريد مهم؟', options: ['نعم', 'لا', 'غير مهم'], answer: 0 },
  { q: 'كلمة السر الضعيفة؟', options: ['12345', 'Ajd92!', '!#F5Gh'], answer: 0 },
  { q: 'التحقق بخطوتين يحمي حسابك؟', options: ['نعم', 'لا', 'ليس دائماً'], answer: 0 },
  { q: 'هل يجب استخدام كلمات سر مختلفة لكل موقع؟', options: ['نعم', 'لا', 'حسب نوع الموقع'], answer: 0 }
];

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateQuestionCounter() {
  const counter = document.getElementById('questionCounter');
  if (!counter || !quizQuestions.length) return;
  counter.textContent = `السؤال ${currentQuestion + 1} من ${quizQuestions.length}`;
}

function updateQuizProgress() {
  const bar = document.getElementById('quizProgressBar');
  if (!bar || !quizQuestions.length) return;
  const percent = (currentQuestion / quizQuestions.length) * 100;
  bar.style.width = `${percent}%`;
}

function showQuestion() {
  const qText = document.getElementById('questionText');
  const buttons = document.getElementById('quizButtons');
  const result = document.getElementById('quizResult');
  if (!qText || !buttons || !quizQuestions[currentQuestion]) return;

  const q = quizQuestions[currentQuestion];
  qText.textContent = q.q;
  buttons.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    buttons.appendChild(btn);
  });

  if (result) {
    result.textContent = '';
    result.className = 'quiz-result';
  }

  updateQuestionCounter();
  updateQuizProgress();
}

function scoreMessage() {
  if (!quizQuestions.length) return '';
  const ratio = score / quizQuestions.length;
  if (ratio === 1) {
    return 'ممتاز! وعيك الأمني عالٍ جداً 👏';
  } else if (ratio >= 0.7) {
    return 'جيد جداً! استمر واطلع على النصائح لرفع مستواك أكثر.';
  } else if (ratio >= 0.4) {
    return 'مستوى متوسط، جرّب قراءة النصائح ثم أعد الاختبار.';
  }
  return 'بحاجة لتطوير، ابدأ من نصائح الأمن الأساسية ثم أعد المحاولة.';
}

function checkAnswer(i) {
  const result = document.getElementById('quizResult');
  const scoreEl = document.getElementById('quizScore');

  if (!quizQuestions[currentQuestion]) return;

  if (i === quizQuestions[currentQuestion].answer) {
    score++;
    if (result) {
      result.textContent = 'إجابة صحيحة!';
      result.className = 'quiz-result correct';
    }
  } else {
    if (result) {
      result.textContent = 'إجابة غير صحيحة، راجع النصائح الأمنية وحاول مرة أخرى.';
      result.className = 'quiz-result wrong';
    }
  }

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    updateQuizProgress();
    setTimeout(showQuestion, 900);
  } else {
    const bar = document.getElementById('quizProgressBar');
    if (bar) bar.style.width = '100%';

    setTimeout(() => {
      if (result) {
        result.textContent = 'انتهى الاختبار!';
        result.className = 'quiz-result';
      }
      if (scoreEl) {
        scoreEl.textContent = `درجتك: ${score}/${quizQuestions.length} — ${scoreMessage()}`;
      }
      const restartBtn = document.getElementById('restartBtn');
      if (restartBtn) restartBtn.style.display = 'inline-flex';
    }, 900);
  }
}

function restartQuiz() {
  initQuiz();
}

function initQuiz() {
  quizQuestions = shuffle(allQuestions.slice()).slice(0, TOTAL_QUESTIONS);
  currentQuestion = 0;
  score = 0;

  const scoreEl = document.getElementById('quizScore');
  const result = document.getElementById('quizResult');
  const restartBtn = document.getElementById('restartBtn');

  if (scoreEl) scoreEl.textContent = '';
  if (result) {
    result.textContent = '';
    result.className = 'quiz-result';
  }
  if (restartBtn) restartBtn.style.display = 'none';

  updateQuizProgress();
  showQuestion();
}

// مولد كلمة السر
function generate() {
  const lengthInput = document.getElementById('passLength');
  const genOut = document.getElementById('genOut');
  let length = parseInt(lengthInput ? lengthInput.value : '12', 10);

  if (isNaN(length) || length < 6) length = 6;
  if (length > 32) length = 32;
  if (lengthInput) lengthInput.value = length;

  let chars = '';
  if (document.getElementById('upper')?.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (document.getElementById('lower')?.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (document.getElementById('numbers')?.checked) chars += '0123456789';
  if (document.getElementById('symbols')?.checked) chars += '!@#$%_';

  if (!genOut) return;

  if (!chars) {
    genOut.textContent = 'يرجى اختيار نوع واحد على الأقل من الأحرف.';
    genOut.className = 'gen-output gen-output-warning';
    return;
  }

  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  genOut.className = 'gen-output';
  genOut.innerHTML = `
    <span class="gen-password">${pass}</span>
    <button type="button" class="btn btn-secondary copy-btn" onclick="copyPass()">نسخ</button>
  `;
}

function copyPass() {
  const genOut = document.getElementById('genOut');
  if (!genOut) return;
  const passEl = genOut.querySelector('.gen-password');
  if (!passEl) return;

  const text = passEl.textContent.trim();
  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(text).then(() => {
    genOut.classList.add('gen-output-copied');
    setTimeout(() => genOut.classList.remove('gen-output-copied'), 1200);
  }).catch(() => {
    // تجاهل الخطأ أو يمكن عرض رسالة بسيطة في المستقبل
  });
}

// فحص قوة كلمة السر
function evaluatePasswordStrength(p) {
  if (!p) {
    return { label: '', level: 0, width: '0%' };
  }

  let scoreLocal = 0;

  if (p.length >= 10) scoreLocal++;
  if (p.length >= 14) scoreLocal++;
  if (/[A-Z]/.test(p)) scoreLocal++;
  if (/[a-z]/.test(p)) scoreLocal++;
  if (/[0-9]/.test(p)) scoreLocal++;
  if (/[!@#$%_]/.test(p)) scoreLocal++;

  if (scoreLocal <= 2) {
    return {
      label: 'ضعيفة - حاول زيادة الطول وإضافة أحرف كبيرة، أرقام ورموز.',
      level: 1,
      width: '30%'
    };
  } else if (scoreLocal <= 4) {
    return {
      label: 'متوسطة - جيدة، لكن يمكن تقويتها بزيادة الطول وتنويع الأحرف.',
      level: 2,
      width: '65%'
    };
  }

  return {
    label: 'قوية - ممتاز! استمر باستخدام كلمات سر بهذا المستوى.',
    level: 3,
    width: '100%'
  };
}

function checkPass() {
  const pInput = document.getElementById('passInput');
  const out = document.getElementById('checkOut');
  const bar = document.getElementById('strengthBar');

  if (!pInput || !out || !bar) return;

  const p = pInput.value;

  if (!p) {
    bar.style.width = '0%';
    bar.className = 'strength-bar';
    out.textContent = 'اكتب كلمة السر لعرض تقييم القوة.';
    return;
  }

  const result = evaluatePasswordStrength(p);
  bar.style.width = result.width;
  bar.className = `strength-bar strength-level-${result.level}`;
  out.textContent = result.label;
}

// نصائح الأمن السيبراني
let tips = [
  'لا تستخدم نفس كلمة السر لكل موقع، خصص كلمة مختلفة لكل خدمة.',
  'فعّل التحقق بخطوتين على حساباتك المهمة مثل البريد والبنوك.',
  'لا تضغط على الروابط المجهولة أو غير المتوقعة في البريد والرسائل.',
  'تأكد من أن عنوان الموقع يبدأ بـ https وأنه مكتوب بشكل صحيح.',
  'استخدم برنامج إدارة كلمات السر لحفظ وتنظيم كلماتك بأمان.',
  'تأكد من تحديث نظام التشغيل والتطبيقات باستمرار لسد الثغرات.',
  'لا تشارك كلمة السر مع أي شخص مهما كان قريباً منك.',
  'تجنب الاتصال بشبكات واي فاي عامة غير آمنة عند إدخال معلومات حساسة.',
  'استخدم جدار حماية وبرنامج مضاد للبرمجيات الخبيثة موثوق.',
  'تحقق من هوية المرسل قبل تنزيل أي مرفقات من البريد الإلكتروني.'
];

function newTip() {
  const container = document.getElementById('tipBox');
  if (!container) return;
  container.innerHTML = '';

  const used = new Set();
  while (container.children.length < 4 && used.size < tips.length) {
    const index = Math.floor(Math.random() * tips.length);
    if (used.has(index)) continue;
    used.add(index);

    const tip = document.createElement('div');
    tip.className = 'tip-card tip-animate';
    tip.innerHTML = `
      <span class="tip-icon">⚡</span>
      <span class="tip-text">${tips[index]}</span>
    `;
    container.appendChild(tip);
  }
}

// تهيئة الصفحة عند التحميل
window.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  newTip();
});
