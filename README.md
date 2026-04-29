# Build a Pixel Art Maker with HTML, CSS, and JavaScript

Learn to build a browser-based pixel art editor using HTML Canvas, 2D arrays, and vanilla JavaScript. Draw, erase, flood fill, and export your pixel art as PNG.

**Prerequisites:** HTML, CSS, JavaScript fundamentals

**[Live Demo](https://goku-kun.github.io/build-a-pixel-art-maker-with-html-css-and-javascript/completed/)**

## Features

- **Pen tool** — Click and drag to draw pixels in any color
- **Eraser tool** — Erase pixels back to white
- **Fill tool** — Flood fill contiguous regions with a single click
- **Color palette** — 16 preset colors + a custom color picker
- **Grid sizes** — Switch between 16x16, 32x32, and 64x64 grids
- **PNG export** — Download your pixel art as a clean PNG (no grid lines)
- **Hover preview** — Semi-transparent preview of the current color on hover

## Project Structure

```
pixel-art-maker/
├── starter/           # Start here — has TODOs to fill in
│   ├── index.html
│   ├── style.css
│   └── script.js
└── completed/         # Reference — fully working code
    ├── index.html
    ├── style.css
    └── script.js
```

## Getting Started

1. Clone this repository.
2. Open `starter/index.html` in your browser.
3. Follow the TODO comments in `starter/script.js` to implement each feature step by step.

If you get stuck, refer to the `completed/` directory for the finished code.

## Concepts Covered

- **Canvas API** — Using `fillRect`, `strokeRect`, `toDataURL`, and `getContext("2d")` to draw and export graphics.
- **2D Arrays** — Representing grid state in memory and keeping it in sync with the visual canvas.
- **Event Handling** — Using `mousedown`, `mousemove`, `mouseup`, and `mouseleave` for click-and-drag drawing.
- **Coordinate Mapping** — Converting screen pixel positions to grid cell indices using `getBoundingClientRect()` and `Math.floor`.
- **Flood Fill Algorithm** — Using a stack-based iterative approach to fill contiguous regions.
- **File Downloads** — Programmatically creating download links with `toDataURL()`.
- **Responsive CSS** — Using `@media` queries to adapt layouts for different screen sizes.

## Ideas to Keep Building

- **Undo/Redo** — Save grid snapshots to an array and navigate back and forth.
- **Save/Load** — Store the grid in `localStorage` so art persists between sessions.
- **Animation** — Create multiple frames and play them back as a GIF-like animation.
- **Layers** — Add multiple grids stacked on top of each other, like Photoshop layers.
- **Touch Support** — Add `touchstart`, `touchmove`, and `touchend` events for tablets and phones.

## Resources

- [Canvas API Documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Flood Fill Algorithm (Wikipedia)](https://en.wikipedia.org/wiki/Flood_fill)
- [Mouse Events (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- [CSS Grid Layout (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)

## License

This project is licensed under the [MIT License](LICENSE).
