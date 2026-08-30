# Text-to-Speech

**Type:** Standalone web app (front-end, browser API)
**Estimated year:** ~2024
**Tech stack:** HTML, CSS, vanilla JavaScript, Web Speech API (`SpeechSynthesis`)

## What it does

A simple tool where you type text into a box and press "Speak" to have the browser read it out loud.

## How it works

- Checks if `speechSynthesis` is available in the browser (`'speechSynthesis' in window`).
- Wraps the typed text in a `SpeechSynthesisUtterance` object and passes it to `speechSynthesis.speak()`.
- Falls back to an alert if the browser doesn't support the API.

## What I learned

This was my first time using a browser Web API instead of writing all the logic myself — the browser does the actual text-to-speech work, and my job was just to wire up the UI and handle the case where a feature isn't supported. That "feature detection + graceful fallback" pattern is something I now recognize as a common, important habit in front-end development.
