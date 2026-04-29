const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");

let gridSize = 16;
let cellSize = 0;
let grid = [];

let currentColor = "#000000";
let currentTool = "pen";
let isDrawing = false;
let hoveredCell = null;

const PRESET_COLORS = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8800",
  "#8800ff",
  "#888888",
  "#553322",
  "#ff6688",
  "#88ff66",
  "#6688ff",
  "#ffcc00",
];

// --- Step 1-a: Initialize the grid and canvas ---

function init() {
  // Create a 2D array filled with "#ffffff" and assign it to `grid`
  // Hint: Use Array.from({ length: gridSize }, () => Array(gridSize).fill(...))
  grid = Array.from({ length: gridSize }, () => {
    Array(gridSize).fill("#ffffff");
  });

  // Calculate cellSize from 480 / gridSize (use Math.floor)
  cellSize = Math.floor(480 / gridSize);

  // Set canvas.width and canvas.height to gridSize * cellSize
  canvas.width = gridSize * cellSize;
  canvas.height = gridSize * cellSize;

  render();
}

// --- Step 1-b: Render the grid onto the canvas ---

function render() {
  // Loop through every row and column in the grid
  // For each cell:
  //   1. Set ctx.fillStyle to grid[row][col]
  //   2. Use ctx.fillRect to draw the cell
  //   3. Set ctx.strokeStyle to "#333333" and ctx.lineWidth to 0.5
  //   4. Use ctx.strokeRect to draw the grid lines
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      ctx.fillStyle = grid[row][col];
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  // Add hover preview
  // If hoveredCell exists and we're not drawing:
  //   1. Get the row and col from hoveredCell
  //   2. Set previewColor based on currentTool (eraser = "#ffffff", otherwise currentColor)
  //   3. Set ctx.globalAlpha to 0.4
  //   4. Draw the preview with ctx.fillRect
  //   5. Reset ctx.globalAlpha to 1.0
  if (hoveredCell && !isDrawing) {
    const { row, col } = hoveredCell;
    const previewColor = currentTool == "eraser" ? "#ffffff" : currentColor;
    ctx.globalAlpha = 0.4;
    
    ctx.fillStyle = previewColor;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.globalAlpha = 1.0;
  }
}

// --- Step 2-a: Map mouse position to grid cell ---

function getCellFromMouse(e) {
  // Use canvas.getBoundingClientRect() to get the canvas position
  const rect = canvas.getBoundingClientRect();

  // Calculate x and y relative to the canvas
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Convert to col and row using Math.floor(x / cellSize) and Math.floor(y / cellSize)
  const row = Math.floor(y / sellSize);
  const col = Math.floor(x / cellSize);

  // Return { row, col } if within bounds, otherwise return null
  if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
    return { row, col };
  }
  return null;
}

// --- Step 2-b: Paint a single cell ---

function paintCell(row, col) {
  // If currentTool is "pen", set grid[row][col] to currentColor
  // If currentTool is "eraser", set grid[row][col] to "#ffffff"
  // Call render()
  if (currentTool === "pen") {
    grid[row][col] = currentColor;
  } else if (currentTool === "eraser") {
    grid[row][col] = "#ffffff";
  }

  render();
}

// --- Step 2-c: Mouse event handlers ---

canvas.addEventListener("mousedown", (e) => {
  // Set isDrawing to true
  // Get the cell from getCellFromMouse(e)
  // If cell exists:
  //   - If currentTool is "fill", call floodFill(cell.row, cell.col, currentColor)
  //   - Otherwise, call paintCell(cell.row, cell.col)
  isDrawing = true;

  const cell = getCellFromMouse(e);
  if (cell) {
    if (currentTool === "fill") {
      floodFill(cell.row, cell.col, currentColor);
    } else {
      paintCell(cell.row, cell.col);
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  // Get the cell and set hoveredCell
  // If isDrawing AND currentTool is not "fill" AND cell exists, call paintCell
  // Otherwise, call render() to update the hover preview
  const cell = getCellFromMouse(e);
  hoveredCell = cell;

  if (isDrawing && currentTool !== "fill" && cell) {
    paintCell(cell.row, cell.col);
  } else {
    render();
  }
});

canvas.addEventListener("mouseup", () => {
  // Set isDrawing to false
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  // Set isDrawing to false
  // Set hoveredCell to null
  // Call render()

  isDrawing = false;
  hoveredCell = null;
  render();
});

// --- Step 3: Flood fill algorithm ---

function floodFill(row, col, newColor) {
  // TODO: Get the targetColor from grid[row][col]
  // TODO: If targetColor equals newColor, return early (nothing to fill)
  // TODO: Create a stack array with [[row, col]]
  // TODO: While the stack is not empty:
  //   1. Pop [r, c] from the stack
  //   2. Skip if out of bounds
  //   3. Skip if grid[r][c] !== targetColor
  //   4. Set grid[r][c] to newColor
  //   5. Push all 4 neighbors: [r-1,c], [r+1,c], [r,c-1], [r,c+1]
  // TODO: Call render()
}

// --- Step 4-a: Build the color palette ---

function buildPalette() {
  // TODO: Get the palette element by id "color-palette"
  // TODO: Loop through PRESET_COLORS and for each color:
  //   1. Create a div element
  //   2. Add the "color-swatch" class
  //   3. If this color matches currentColor, also add the "active" class
  //   4. Set its backgroundColor to the color
  //   5. Add a click handler that:
  //      - Sets currentColor to this color
  //      - Syncs the custom color picker value
  //      - Removes "active" from all swatches
  //      - Adds "active" to this swatch
  //   6. Append the swatch to the palette
}

// --- Step 4-b: Custom color picker ---

// TODO: Add an "input" event listener to the "custom-color" element
// When it changes:
//   - Set currentColor to e.target.value
//   - Remove "active" class from all color swatches

// --- Step 4-c: Tool button switching ---

// TODO: Select all ".tool-btn" elements and add click handlers
// When a tool button is clicked:
//   - Set currentTool to btn.dataset.tool
//   - Remove "active" from all tool buttons
//   - Add "active" to the clicked button

buildPalette();

// --- Step 5: Grid size switching ---

// TODO: Add a "change" event listener to the "grid-size" element
// When it changes:
//   - Show a confirm dialog: "Changing grid size will clear your canvas. Continue?"
//   - If confirmed: update gridSize with parseInt(e.target.value) and call init()
//   - If cancelled: revert e.target.value back to gridSize

// --- Step 6: PNG export ---

// TODO: Add a "click" event listener to the "export-btn" element
// When clicked:
//   1. Create a new canvas element (not the visible one!)
//   2. Calculate exportCellSize = Math.max(16, Math.floor(512 / gridSize))
//   3. Set the export canvas size to gridSize * exportCellSize
//   4. Loop through the grid and draw each cell (NO grid lines)
//   5. Create an <a> element with download="pixel-art.png"
//   6. Set href to exportCanvas.toDataURL("image/png")
//   7. Call link.click() to trigger the download

// --- Step 7: Start the app! ---

init();
