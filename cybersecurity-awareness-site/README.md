# Cybersecurity Awareness Center

**Type:** Multi-section educational website (front-end)
**Estimated year:** ~October–November 2025
**Tech stack:** HTML, CSS (custom, no framework), vanilla JavaScript
**Collaboration:** Built with a classmate — see credits below

## What it does

An interactive website to raise awareness about cybersecurity basics, with four main sections:

- **Security awareness quiz** — a multiple-choice quiz with a progress bar and running score.
- **Password generator** — builds a random password from configurable options (length, character types).
- **Password strength checker** — scores a typed password and shows how strong it is.
- **Security tips** — a rotating grid of quick digital-safety tips.

## How it works

- A single-page layout with anchor-link navigation (`#quiz`, `#gen`, `#check`, `#tips`) between sections.
- The quiz renders one question at a time from a questions array, tracks the current index and score, and updates a progress bar as you go.
- The password generator and strength checker build on the same ideas as the earlier standalone `password-generator` project, but with a cleaner structure and better-organized CSS.

## What I learned

This project shows real growth compared to my earlier standalone tools: instead of one page doing one thing, this is a multi-section site with shared navigation, a more deliberate visual design system (CSS custom properties, a consistent card/button style), and a stronger separation between structure (HTML), style (CSS), and behavior (JS) across three files instead of one. It was also my first project built and credited as a two-person collaboration, which meant coordinating on scope and style with someone else rather than working entirely solo.

## Credits

This was a joint school project. The footer credits both of us by name, exactly as it appeared in the original site: **Hadeel Al-Bu'aijan and Fatima Al-Salem**.
