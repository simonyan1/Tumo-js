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

