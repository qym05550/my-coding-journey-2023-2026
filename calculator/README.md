# Modern Calculator

**Type:** Standalone web app (front-end)
**Estimated year:** ~2023 (early project)
**Tech stack:** HTML, CSS, vanilla JavaScript

## What it does

A basic on-screen calculator with a circular-button layout. Users can build up a math expression (e.g. `12*4-3`) by clicking number and operator buttons, then press `=` to evaluate it.

## How it works

- Button clicks append digits/operators to a string called `expression`, which is shown in the display.
- Pressing `=` runs the expression through JavaScript's built-in `eval()` and shows the result.
- A `C` button clears the display and resets the expression.

## What I learned

This was a good introduction to state management in plain JavaScript (keeping track of the current expression as a string) and to basic event handling with `onclick`. It also planted the seed for something I understand much better now: using `eval()` on user input is not something you'd do in production code, since it can execute arbitrary JavaScript. It works fine here because the buttons are the only source of input, but it's a good example of "code that works" vs. "code that's safe by design" — a distinction I've grown to appreciate more in later projects (see the cybersecurity awareness site).
