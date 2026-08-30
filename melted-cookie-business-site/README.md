# MELTED — Cookie Business Link Page

**Type:** Small business landing / "link-in-bio" page (front-end)
**Estimated year:** ~2025–2026 (most recent project in this archive)
**Tech stack:** HTML, CSS (custom design system with CSS variables), vanilla JavaScript, Google Fonts

## What it does

A branded landing page for a small home cookie business called "MELTED" ("It melts while you taste it"). It works like a link-in-bio page: a profile section with the brand name/tagline, and a set of buttons linking out to WhatsApp (for ordering), TikTok, and Instagram, plus an "INFO" button that opens a modal (currently a placeholder for a future info image).

## How it works

- A CSS custom-property design system (`--cream`, `--choco`, `--caramel`, etc.) drives a consistent warm color palette across the whole page.
- Link buttons use a layered `::before` pseudo-element with a `height` transition to create a "fill from the bottom" hover animation.
- The INFO button toggles a modal overlay open/closed, with support for closing via the X button, clicking outside the modal, or pressing Escape.
- `prefers-reduced-motion` is respected to disable animations for users who prefer that.

## What I learned

This is the most visually polished and production-minded project in this archive: a real design system built with CSS custom properties instead of repeated hard-coded colors, thoughtful hover/interaction details, and accessibility touches like `aria-label`s, `:focus-visible` styling, and respecting `prefers-reduced-motion`. It also reflects a shift from "build a tool" projects toward "build something a real small business would actually use," which meant thinking about branding and first impressions, not just functionality.

## Security & privacy notes (handled before publishing)

The original page had a **real WhatsApp business phone number hardcoded** in both `index.html` (the order button link) and `script.js` (an order-form message link). Both were replaced with a `YOUR_WHATSAPP_NUMBER` placeholder and a comment explaining what to put there, since this is a real business contact number, not something to publish in a public code archive.
