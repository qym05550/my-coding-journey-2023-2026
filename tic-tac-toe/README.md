# Tic Tac Toe

**Type:** Standalone web game (front-end)
**Estimated year:** ~2023–2024
**Tech stack:** HTML, CSS, vanilla JavaScript

## What it does

A classic Tic Tac Toe game with two modes: play with a friend on the same screen, or play against the computer with a selectable difficulty (easy / medium / hard).

## How it works

- The board state is tracked in a `gameBoard` array of 9 cells.
- `makeMove()` updates the array and the DOM when a cell is clicked, then checks all 8 possible win conditions (`checkForWin()`).
- A simple mode/difficulty selection screen is shown before the game board using `display: none/table` toggling.

## What I learned

This project pushed me from "one thing happens on the page" (like the clock or calculator) into actual game logic: representing a board as data, checking win conditions systematically instead of one-by-one, and structuring a UI with multiple screens/states (menu → difficulty → board). It's a good early example of separating "what the data looks like" from "how it's drawn on screen."
