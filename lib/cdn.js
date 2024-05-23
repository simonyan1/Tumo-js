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



function random(min, max) {
    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    if (Array.isArray(min)) {
        return min[Math.round(Math.random() * min.length - 1)];
    }

    if (min !== undefined && !isNumber(min)) {
        throw new TypeError('First argument must be a number or an array');
    }

    if (max !== undefined && !isNumber(max)) {
        throw new TypeError('Second argument must be a number');
    }

    if (max === undefined) {
        if (min === undefined) {
            return Math.random();
        }
        return Math.round(Math.random() * min);
    }

    return Math.round(Math.random() * (max - min) + min);
}
