# Tax Calculator

**Type:** Standalone web app (front-end)
**Estimated year:** ~2023 (early project)
**Tech stack:** HTML, CSS, vanilla JavaScript

## What it does

A small form where a user enters an income amount and a tax rate (%), and the page calculates and displays the tax owed and the resulting net income.

## How it works

- Reads two number inputs (`income`, `taxRate`) with `parseFloat`.
- Validates that both are real numbers before calculating.
- Computes `tax = income * (taxRate / 100)` and `netIncome = income - tax`, then writes the formatted result into the page.

## What I learned

This project was about handling numeric user input safely — validating with `isNaN()` before doing math, and formatting currency output with `toFixed(2)`. Small, but it's the same pattern (validate → compute → display) used in a lot of real-world form-based tools.
