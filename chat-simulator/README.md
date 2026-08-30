# Chat Simulator

**Type:** Standalone web app (front-end)
**Estimated year:** ~2024
**Tech stack:** HTML, CSS, vanilla JavaScript

## What it does

A two-user chat mock-up (in Arabic) where you can switch between "Person 1" and "Person 2," type messages as whichever user is selected, and see the conversation rendered as chat bubbles (sender bubbles vs. receiver bubbles). User names can also be renamed by clicking on them.

## How it works

- Two `users` objects hold each person's name and message history.
- Sending a message pushes it into both users' message arrays so switching between them shows a consistent conversation.
- `renderMessages()` clears and rebuilds the message list each time, styling bubbles differently depending on whether the current viewer is the sender or receiver.

## What I learned

This was a simulation of what a real chat app's front end has to do — even without a server or database — and it's where I first thought carefully about "whose perspective am I rendering from?" (the same message looks different depending on who's viewing it). That distinction between data and its per-viewer presentation is a core idea in real messaging apps.
