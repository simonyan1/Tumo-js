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



function drawEllipse(width, height) {
    // If only one parameter is provided, assume it's the radius for both axes (i.e., draw a circle)
    if (arguments.length === 1) {
        height = width;
    }
    // Validate the parameters to ensure they are non-negative numerical values
    if (typeof width !== 'number' || typeof height !== 'number' || width < 0 || height < 0) {
        console.error("Invalid parameters: width and height must be non-negative numerical values.");
        return;
    }

    // Calculate the center of the ellipse based on current direction

    const radianAngle = (currentAngle * Math.PI) / 180;
    const ellipseCenterX = currentX + width * Math.cos(radianAngle) / 2;
    const ellipseCenterY = currentY - height * Math.sin(radianAngle) / 2;

    // If the 2D context was retrieved successfully, draw the ellipse
    if (ctx) {
        ctx.beginPath();
        ctx.ellipse(ellipseCenterX, ellipseCenterY, width / 2, height / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
    } else {
        console.error("Could not retrieve 2D context from canvas.");
    }

    const newX = currentX + width * Math.cos(radianAngle);
    const newY = currentY - height * Math.sin(radianAngle);
    currentX = newX
    currentY = newY
};



function erase() {
    // Check if the 2D context (ctx) is available
    if (ctx) {
        // Clear the entire canvas by specifying the rectangle that covers the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        // If the 2D context is not available, log an error message
        console.error("Could not retrieve 2D context from canvas.");
    }
}


