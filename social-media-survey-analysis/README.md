# Social Media Usage & Psychological Impact — Survey Analysis

**Type:** Data analysis scripts (Python, Excel VBA, PowerShell) + study notes
**Estimated year:** ~October–November 2025
**Tech stack:** Python (pandas, numpy, matplotlib, seaborn, scipy), Excel VBA, PowerShell, Markdown

## What it does

A small data-science side project analyzing survey results about a program called **"Masarek"** (مسارك), which aimed to reduce participants' daily social media usage. The scripts:

- Clean and convert messy survey text answers (in both Arabic and English, e.g. "1–3 hours" or "أكثر من 6") into numeric values.
- Compute the **Pearson correlation** between daily usage hours and self-reported psychological impact (stress, anxiety, sleep issues, etc.).
- Generate charts: a scatter plot with trend line, distribution bar charts, and a correlation heatmap.
- Produce a before/after bar chart showing the program reduced average daily usage from 4.5 to 2.1 hours across 33 participants over a 4-week trial.

## Files in this folder

| File | What it is |
|---|---|
| `correlation_analysis.py` | Main Python script: cleans survey data from Excel, computes correlation + p-value, generates a 4-panel chart, and exports results back to Excel. |
| `CorrelationAnalysis.vba` | The same correlation + charting logic re-implemented as an Excel macro, for doing the analysis directly inside Excel without Python. |
| `masarek_chart_english.py` | A standalone script that generates just the before/after usage-reduction bar chart. |
| `generate_minimax_videos.ps1` | A PowerShell utility script for batch-generating short videos via the Minimax AI video API, used to create supporting visuals/content for this project. |
| `Seaborn Data Visualization Study Guide.md` | My own study notes on the Seaborn plotting library, written while learning the visualization techniques used in the analysis script above. |

## What I learned

This was a step beyond front-end web projects — real statistical analysis on survey data, going from messy free-text answers (in two languages) to clean numeric values, to a correlation coefficient and p-value, to a finished visualization. Writing the same logic twice (once in Python, once in Excel VBA) also helped me see how the same idea — "clean text, convert to numbers, compute a statistic" — translates across very different tools. The study guide file shows the "learning in progress" side of this: notes I wrote for myself while figuring out Seaborn, kept here unedited as part of the process, not just the polished result.

## Security & privacy notes (handled before publishing)

- `correlation_analysis.py`, `masarek_chart_english.py`, and `generate_minimax_videos.ps1` originally contained **hardcoded personal local file paths** (e.g. `C:\Users\Hadee\Desktop\...`), which included my Windows username. These were replaced with generic relative paths (e.g. `./data/...`, `./output/...`) before publishing.
- `generate_minimax_videos.ps1` already handled its API key correctly in the original version — it reads `MINIMAX_API_KEY` from an environment variable and never hardcodes it, so no change was needed there. It's actually a good example from this same period of already knowing to keep a secret out of the code.
- No raw survey data (the actual Excel file with participants' answers) is included in this archive — only the analysis code.
