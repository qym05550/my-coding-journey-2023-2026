# Smart Schedule Assistant (Front-End Stub)

**Type:** Front-end stub for a web app with a planned backend
**Estimated year:** ~2024
**Tech stack:** HTML, vanilla JavaScript (`fetch` API)

## What it does

A minimal front end where you type your plans/tasks for the day and submit them to get back a "recommended plan." The page itself just collects the input and displays whatever comes back.

## How it works

- On submit, the form's default behavior is prevented, and the input text is sent as JSON in a `POST` request to `PersonalAssistantServlet` using `fetch()`.
- The response text is inserted directly into an `output` div.

## What I learned

This project is intentionally incomplete — it's the front end for a Java servlet backend (`PersonalAssistantServlet`) that isn't included in this archive, so it won't produce real recommendations if you open it as-is. It's kept here anyway because it shows an early attempt at thinking about a full client-server app: separating "the part that talks to the user" (this file) from "the part that would do the actual logic" (the servlet), even though only the client side was finished.
