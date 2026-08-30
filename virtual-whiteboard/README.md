# Virtual Whiteboard

**Type:** Standalone web app (front-end)
**Estimated year:** ~2024
**Tech stack:** HTML, CSS, vanilla JavaScript, HTML5 Canvas

## What it does

A simple drawing whiteboard (سبورتي البيضاء) where you can freehand-draw on a canvas with a chosen color and brush size, and clear the canvas.

## How it works

- Uses the HTML5 `<canvas>` element and its 2D drawing context.
- Tracks mouse events (`mousedown`, `mousemove`, `mouseup`, `mouseleave`) to know when the user is actively "painting."
- Draws line segments between consecutive mouse positions using `lineTo` / `stroke`, with color and line width read live from a color picker and a range slider.

## What I learned

This was my introduction to the Canvas API and to converting continuous mouse movement into drawn strokes — translating screen coordinates (`clientX`/`clientY`) into canvas-relative coordinates using `getBoundingClientRect()`. It's a nice example of turning a raw browser event stream into something visual and interactive in real time.
