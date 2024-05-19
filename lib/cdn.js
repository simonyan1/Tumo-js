// Define canvas and context globally
let canvas, ctx;

function createCanvas(width, height) {
    // Create a canvas element
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    // Get the 2D drawing context
    ctx = canvas.getContext('2d');

    // Style the canvas using JavaScript
    canvas.style.border = '1px solid #000';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';

    // Set canvas size to the specified width and height
    canvas.width = width;
    canvas.height = height;
}

function drawLine(length) {
    // If canvas doesn't exist or the 2D context is not supported, return
    if (!canvas || !ctx) {
        console.error('Canvas or 2D context not initialized.');
        return;
    }
    // Get the center coordinates of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw the line from the center to the top
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - length);
    ctx.stroke();
}

function drawPolygon(sides, sideLength) {

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX + sideLength * Math.cos(0), centerY + sideLength * Math.sin(0));
    
    for (let i = 1; i <= sides; i++) {
        ctx.lineTo(centerX + sideLength * Math.cos(i * 2 * Math.PI / sides), centerY + sideLength * Math.sin(i * 2 * Math.PI / sides));
    }
    
    ctx.closePath();
    ctx.stroke();
}



function showGrid(cellSize) {
    // Argument validation
    if (typeof cellSize !== 'number' || cellSize < 0) {
        console.error("Error: cellSize must be a non-negative numerical value.");
        return; // Exit the function early if validation fails
    }


    const width = canvas.width;
    const height = canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = '#ccc'; // Color of the grid lines

    // Vertical lines
    for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.stroke();
}
