// Define canvas and context globally
let canvas, ctx;
let currentAngle = 90;
let currentX, currentY;
//Define x and y globally
let globalX, globalY;

function createCanvas(width, height) {
    // Create a canvas element
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    // Get the 2D drawing context
    ctx = canvas.getContext("2d");

    // Style the canvas using JavaScript
    canvas.style.border = "1px solid #000";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    // Set canvas size to the specified width and height
    canvas.width = width;
    canvas.height = height;

    currentX = canvas.width / 2;
    currentY = canvas.height / 2;
    // Set canvas size to the specified width and height
    canvas.width = width;
    canvas.height = height;
    globalX = (canvas.width - width) / 2;
    globalY = (canvas.height - height) / 2;
}

function drawLine(length) {
    if (typeof length !== "number" || length < 0) {
        console.error(
            "Invalid length. Length must be a non-negative numerical value."
        );
        return;
    }

    if (!canvas || !ctx) {
        console.error("Canvas or 2D context not initialized.");
        return;
    }

    const radianAngle = (currentAngle * Math.PI) / 180;
    const newX = currentX + length * Math.cos(radianAngle);
    const newY = currentY - length * Math.sin(radianAngle); // Note the negative sign for the Y-axis

    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(newX, newY);
    ctx.stroke();

    currentX = newX;
    currentY = newY;
}

function turnLeft(angle) {
    if (typeof angle !== "number") {
        console.error("Invalid angle. Angle must be a numerical value.");
        return;
    }
    currentAngle = (currentAngle + angle + 360) % 360;
}

function turnRight(angle) {
    if (typeof angle !== "number") {
        console.error("Invalid angle. Angle must be a numerical value.");
        return;
    }
    currentAngle = (currentAngle - angle) % 360;
}

function drawRectangle(width, height) {

    // If canvas doesn't exist or the 2D context is not supported, return
    if (!canvas || !ctx) {
        console.error('Canvas or 2D context not initialized.');
        return;
    }

    // Validate the width parameter
    if (typeof width !== 'number' || width < 0) {
        console.error('Invalid width: must be a non-negative number.');
        return;
    }

    // Validate the height parameter if provided
    if (height !== undefined) {
        if (typeof height !== 'number' || height < 0) {
            console.error('Invalid height: must be a non-negative number.');
            return;
        }
    } else {
        // If height is not provided, use width to make a square
        height = width;
    }

    // Draw the rectangle
    ctx.beginPath();
    ctx.rect(globalX, globalX, width, height); // Drawing the rectangle with a starting point at (globalX, globalX)
    ctx.stroke();
}



function random(min = 0, max = 1) {
    // Validate the min parameter
    if (typeof min !== 'number' || !Number.isInteger(min)) {
        console.error('Invalid minimum: must be a whole number.');
        return null;
    }

    // Validate the max parameter
    if (typeof max !== 'number' || !Number.isInteger(max)) {
        console.error('Invalid maximum: must be a whole number.');
        return null;
    }

    // Ensure min is less than or equal to max
    if (min > max) {
        console.error('Invalid range: min must be less than or equal to max.');
        return null;
    }

    // Generate a random integer between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
