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
  canvas.style.top = "150";
  canvas.style.left = "150";

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

function left(angle) {
  if (typeof angle !== "number") {
    console.error("Invalid angle. Angle must be a numerical value.");
    return;
  }
  currentAngle = (currentAngle + angle + 360) % 360;
}

function right(angle) {
  if (typeof angle !== "number") {
    console.error("Invalid angle. Angle must be a numerical value.");
    return;
  }
  currentAngle = (currentAngle - angle) % 360;
}

function goTo(newX, newY) {
  if (typeof newX !== "number" || typeof newY !== "number") {
    console.error("Invalid coordinates. Coordinate must be a numerical value.");
    return;
   }
    const CoordX = Math.abs(newX)
    const CoordY = Math.abs(newY)
    if (canvas.width/2 < CoordX || canvas.height/2 < CoordY) {
    console.log("Coordinates are out of canvas.");
        return;
    }
  currentX = newX;
  currentY = newY;
  ctx.moveTo(newX, newY);
}