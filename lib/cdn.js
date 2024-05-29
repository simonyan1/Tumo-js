// Define canvas and context globally
let canvas, ctx;
let currentAngle = 90;
let currentX, currentY;

function createCanvas(width, height) {

    // Create a canvas element
    canvas = document.createElement("canvas");
    let co =  document.createElement("div");
    // Set canvas size to the specified width and height
    canvas.width = width;
    canvas.height = height;
    currentX = canvas.width / 2;
    currentY = canvas.height / 2;

    let text = document.createTextNode("X:" + currentX + " Y:" + currentY);
    co.appendChild(text);
    document.body.appendChild(co);
    document.body.appendChild(canvas);

    // Get the 2D drawing context
    ctx = canvas.getContext("2d");

    // Style the canvas using JavaScript
    canvas.style.border = "1px solid #000";
    canvas.style.position = "absolute";
    canvas.style.top = "150";
    canvas.style.left = "150";

    HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

    canvas.addEventListener("mousemove", function (event) {
        coords = canvas.relMouseCoords(event);
        canvasX = coords.x;
        canvasY = coords.y;
        co.innerHTML = "X:" + (canvasX) + " Y:" + (canvasY);
    });
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
function goTo(newX, newY) {
    if (typeof newX !== "number" || typeof newY !== "number") {
        console.error("Invalid coordinates. Coordinate must be a numerical value.");
        return;
    }
    const CoordX = Math.abs(newX)
    const CoordY = Math.abs(newY)
    if (canvas.width / 2 < CoordX || canvas.height / 2 < CoordY) {
        console.log("Coordinates are out of canvas.");
        return;
    }
    currentX = newX;
    currentY = newY;
    ctx.moveTo(newX, newY);
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




function drawPolygon(sideCount,length) {
  right(360/sideCount +180)
    if (length > 0 && typeof length == "number") {
        for(let i = 0; i< sideCount;i++){
            right(360/sideCount)
            drawLine(length)
        }
    }
  
}


function drawTriangle(length) {
    if (length > 0 && typeof length == "number") {
        for(let i = 0; i< 3;i++){
            drawLine(length)
            right(120)
        }
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
    ctx.restore(); // Restore the saved transformation matrix

}





function showGrid(cellSize) {
    // Argument validation
    if (typeof cellSize !== 'number' || cellSize < 0) {
        console.error("Error: cellSize must be a non-negative numerical value.");
        return; // Exit the function early if validation fails
    }

    const width = canvas.width;
    const height = canvas.height;

    // Save the current canvas state
    ctx.save();

    // Set the stroke style for grid lines
    ctx.strokeStyle = '#ccc'; // Color of the grid lines

    // Draw the grid lines
    ctx.beginPath();

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

    // Restore the canvas state to revert stroke style and transformations
    ctx.restore();
}

function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }

}


function rotate(degree) {
  if (typeof degree !== "number" || degree < 0) {
    console.error(
      "Invalid degree. Degree must be a non-negative numerical value."
    );
    return;
  }

  if (!canvas || !ctx) {
    console.error("Canvas or 2D context not initialized.");
    return;
  }

  currentAngle = (currentAngle - degree) % 360;
}