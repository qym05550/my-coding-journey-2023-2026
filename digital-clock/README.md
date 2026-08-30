# Digital Clock

**Type:** Standalone web page (front-end)
**Estimated year:** ~2023 (early project)
**Tech stack:** HTML, CSS, vanilla JavaScript

## What it does

A single-page digital clock that displays the current time (hours, minutes, seconds) in real time, updating every second, on a black background with large white text.

## How it works

- `Date()` is used to read the current hours, minutes, and seconds.
- `setInterval()` calls an `updateTime()` function once per second to refresh the display.
- Minutes and seconds are zero-padded (e.g. `05` instead of `5`) with a simple ternary check.

## What I learned

This was one of my first experiments with JavaScript's `Date` object and timers (`setInterval`). It taught me the basic loop of "read data → format it → write it to the DOM" that shows up in almost every interactive web project I built afterward.

## Note

The original archive contained two identical copies of this project (`file1.html` and `time-2.html`). Only one copy was kept here since they were exact duplicates.
