# To Do List

**Type:** Standalone web app (front-end)
**Estimated year:** ~2024
**Tech stack:** HTML, CSS, vanilla JavaScript

## What it does

A to-do list where each task has a name, due date, description, category (Work / Personal / Shopping), priority (Low / Medium / High / Critical), and status (Not Started / In Progress / Completed) — each shown with its own color coding.

## How it works

- A form collects all the task fields, and `addTask()` builds a new `<li>` element and appends it to the task list.
- CSS classes (e.g. `high-priority`, `in-progress`) are combined dynamically based on the selected priority and status to color-code each task.

## What I learned

This project was about modeling something more realistic than earlier apps: a task isn't just text, it has multiple attributes (priority, status, category, due date) that all need to be captured, stored together, and reflected visually. It's an early look at the kind of structured data modeling that shows up constantly in real apps — closer to a small database record than a single string.
