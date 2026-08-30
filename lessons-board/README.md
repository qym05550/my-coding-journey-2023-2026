# Lessons Board

**Type:** Standalone web app (front-end)
**Estimated year:** ~2024
**Tech stack:** HTML, Tailwind CSS (via CDN), Font Awesome, vanilla JavaScript

## What it does

A study dashboard that displays lessons as cards (title, description, thumbnail image), with the ability to search lessons by title, add new lessons through a modal form (with an optional attached document), edit existing lesson cards, and remove them.

## How it works

- Lessons are rendered as cards in a responsive grid (`lessonsGrid`).
- Adding a lesson opens a modal, builds a new card element from the form fields with `document.createElement`, and appends it to the grid.
- `URL.createObjectURL()` is used to let a locally-picked file be opened as a "View Document" link without uploading it anywhere.
- `searchLessons()` filters visible cards in real time based on the search box.

## What I learned

This was my first project using a CSS utility framework (Tailwind, loaded via CDN) instead of hand-written CSS, and my first real "CRUD-style" UI (Create, Read, Update-ish, Delete) built entirely from DOM manipulation rather than a framework like React. It's also where I started working with local files in the browser via `File` objects and object URLs.
