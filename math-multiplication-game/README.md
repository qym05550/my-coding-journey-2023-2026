# Math Safari — Multiplication Table Game

**Type:** Standalone web game (front-end)
**Estimated year:** ~2025
**Tech stack:** HTML, Tailwind CSS (via CDN), Font Awesome, vanilla JavaScript

## What it does

A timed multiplication-table practice game (in Arabic, "سفاري الرياضيات" — "Math Safari"). The player picks a times table (1–10, or random), answers as many multiplication questions as they can within a 60-second timer, and their score and question count are tracked live.

## Who it was built for

**I (Hadeel) built this project — not as a demo for myself, but as a gift/tool for my younger sister,** to help her practice multiplication tables in a fun way. That's why the welcome screen is personalized with her name as "the student" and a teacher's name, rather than mine — it was designed to feel like it belonged to her, not to me. I'm keeping that personalization in the code as-is, since changing it would mean changing what I actually built and who I built it for. This README documents that context so it's clear on its own.

## How it works

- A start screen shows the player/teacher names and a "Start" button; clicking it swaps to the game screen.
- `generateQuestion()` picks two numbers (based on the selected table, or fully random) and displays them as a multiplication question.
- A `setInterval`-based 60-second countdown ends the round automatically, and correct/incorrect answers update a running score and question counter.

## What I learned

This project was about building something for a real, specific person rather than an abstract "user" — which meant thinking about what would keep a younger sibling engaged (a timer, instant feedback, a friendly theme) rather than just proving a technical concept to myself. Technically, it was also my first time combining Tailwind CSS with vanilla JavaScript screen-switching and a countdown timer in one project.

## A note on language

The interface is in Arabic, since it was built for a young, Arabic-speaking user. I've deliberately left the original Arabic UI untouched here (per the "preserve the original code" rule for this whole archive) rather than adding a language switcher — that would be a new feature, not a restoration. Adding bilingual/EN support would be a natural next step if I revisit this project later.
