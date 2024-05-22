// Define canvas and context globally
let canvas, ctx;
let currentAngle = 90;
let currentX, currentY;

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

    if (!canvas || !ctx) {
        console.error('Canvas or 2D context not initialized.');
        return;
    }

    if (typeof width !== 'number' || width < 0) {
        console.error('Invalid width: must be a non-negative number.');
        return;
    }

    if (height !== undefined) {
        if (typeof height !== 'number' || height < 0) {
            console.error('Invalid height: must be a non-negative number.');
            return;
        }
    } else {
        height = width;
    }

    ctx.beginPath();
    ctx.rect(currentX, currentY, width, height);
    ctx.stroke();
}



function random(min = 0, max = 1) {
    if (typeof min !== 'number' || !Number.isInteger(min)) {
        console.error('Invalid minimum: must be a whole number.');
        return null;
    }

    if (typeof max !== 'number' || !Number.isInteger(max)) {
        console.error('Invalid maximum: must be a whole number.');
        return null;
    }

    if (min > max) {
        console.error('Invalid range: min must be less than or equal to max.');
        return null;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
