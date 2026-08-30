# Happy Emoji Vote

**Type:** Web app with a real-time cloud backend
**Estimated year:** ~September–October 2025
**Tech stack:** HTML, CSS, vanilla JavaScript, Firebase Realtime Database

## What it does

A one-question mood poll: "Have you smiled today?" Visitors click a happy or neutral emoji button, and a live vote count for each option updates in real time for everyone viewing the page, powered by Firebase.

## How it works

- `firebase.initializeApp()` connects the page to a Firebase Realtime Database.
- Clicking a button calls `db.ref("votes/" + choice).transaction(...)` to atomically increment that option's count (a transaction avoids two simultaneous clicks corrupting the count).
- `db.ref("votes/happy").on("value", ...)` and the same for `"votes/sad"` subscribe to live updates, so the numbers on screen update instantly for every visitor without refreshing the page.
- Small UI touches (ripple effect on click, background flash, button wiggle) add feedback to each vote.

## What I learned

This was my first time connecting a front end to a real backend service instead of only using local browser storage — specifically, real-time listeners (`on("value", ...)`) instead of one-time reads, and Firebase transactions to handle concurrent writes safely. It's a meaningful step up from earlier projects: the app now has state that's shared across everyone visiting it, not just state that lives in one browser tab.

## Security note (handled before publishing)

This project originally had a **real, live Firebase project configuration hardcoded in `script.js`** — including the API key, project ID, and database URL. Before adding this project to the public archive, all of those values were replaced with placeholders (`YOUR_FIREBASE_API_KEY`, etc.) and a comment was added explaining that a real deployment should keep these out of source control (e.g. injected via a build step or environment variables) and should rely on Firebase Security Rules to control who can read/write data, since a Firebase web API key is not a secret in the traditional sense but the database's security rules are what actually protect the data.

A photo of my school's real sign/logo (`school sign.jpg`) was also removed from this project before publishing, since it directly identified which school I attend.
