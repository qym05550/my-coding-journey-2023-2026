# Genius Password Generator

**Type:** Standalone web app (front-end)
**Estimated year:** ~2024–2025
**Tech stack:** HTML, CSS, vanilla JavaScript, `localStorage`

## What it does

A configurable password generator: choose a length, which character types to include (uppercase, lowercase, numbers, symbols), and characters to exclude (e.g. `O,0,l,I` to avoid confusing look-alikes). It also scores the generated password's strength and can show/hide it and copy it to the clipboard. Your settings are remembered between visits using `localStorage`.

## How it works

- Builds a character pool string based on the checked options, then removes any excluded characters with a regex replace.
- Picks random characters from the pool one at a time to build the password (`Math.random()`).
- `getPasswordStrength()` scores the password on length, and presence of uppercase/lowercase/numbers/symbols, then labels it Weak/Medium/Strong.
- Settings are saved to and loaded from `localStorage` as JSON on every generation and on page load.

## What I learned

This was my introduction to `localStorage` for persisting user preferences across page reloads, and to `navigator.clipboard` for copy-to-clipboard functionality. It's also a nice companion piece to the later, more polished password generator + strength checker built into the cybersecurity awareness site — a good before/after comparison of the same idea.

## Note

`Math.random()` is not cryptographically secure, so this generator (like most learning-project password generators) shouldn't be used for real high-stakes passwords. That's a good example of something I understand better now than when I first wrote this.
