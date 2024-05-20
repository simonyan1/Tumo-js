// Define canvas and context globally
let canvas, ctx;
let currentX = 150
let currentY = 150
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


function drawTriangle(length) {
    if (length > 0) {
        let height = length * Math.sqrt(3) / 2;
        let x = currentX
        let y = currentY
        let x1 = x - length / 2;
        let y1 = y + height;
        let x2 = x + length / 2;
        let y2 = y1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
    }
}
function color(...clr) {
    if (Array.isArray(...clr) ||
        typeof clr[0] === "number" &&
        typeof clr[1] === "number" &&
        typeof clr[2] === "number") {
        ctx.strokeStyle = `rgb(${clr})`
    }
    else if (clr[0].startsWith("#") && clr[0].length == 7 || typeof clr[0] == "string") {
        ctx.strokeStyle = clr[0]
    }
}


