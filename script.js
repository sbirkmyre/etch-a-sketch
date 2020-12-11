// Fetch HTML elements
const panel = document.getElementById("panel");
const gridInfo = document.getElementById("grid-info");

// Intitiate variables
let gridDimension = 16;
let squareColor = "black";

generateGrid(gridDimension);

function generateGrid(gridDimension) {    
    // Calculate the total number of squares in the grid
    let numberOfSquares = gridDimension * gridDimension;

    // Add the calculated number of squares to the drawing panel
    for(let i = 0; i < numberOfSquares; i++) {
        let square = document.createElement("div");
        let dimensions = (panel.clientWidth / gridDimension) + "px";
        square.style.width = dimensions;
        square.style.height = dimensions;
        square.className = "square";
        square.setAttribute("colourCount", 0);
        panel.appendChild(square);
    }    

    // Update the HTML element that displays the current grid dimensions
    gridInfo.textContent = "Current grid size is " + gridDimension + " x " + gridDimension + ".";

    // Add the function to colour the squares when they are hovered over, to each square
    const squares = panel.querySelectorAll(".square");
    squares.forEach(square => square.addEventListener("mouseover",colourSquare));
}

function resetGrid() {
    // Get the new dimension of the grid
    let newGridDimension = prompt("Please specify the size of grid you would like. e.g 16, will produce a 16 x 16 grid.");

    // Ensure the new dimension is a number, and less than 100
    while (isNaN(parseInt(newGridDimension)) || newGridDimension > 100) {                    
        newGridDimension = prompt("Please select a number that is less than 100.");
    }

    // Generate the new grid
    clearGrid();
    generateGrid(newGridDimension);
}

function clearGrid() {
    // Remove the first child from the drawing area, whilst there is one
    while (panel.firstChild) {
        panel.removeChild(panel.lastChild);
    }
}

function changeColour() {              
    const button = document.getElementById("colour-button");

    // Update the current drawing colour, and the button text
    if (squareColor === "black") {
        squareColor = "rgb";
        button.textContent = "Draw in black";
    }
    else {
        squareColor = "black";
        button.textContent = "Draw in RGB";
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function colourSquare(e) {
    // Depending on the current drawing colour
    if (squareColor === "rgb") {
        // Colour the square in a random colour
        e.target.style.backgroundColor = getRandomColor();
        e.target.setAttribute("colourCount", 0);
    }
    else {
        let count = parseFloat(e.target.getAttribute("colourCount"));

        // Colour the square in greyscale if it's been hovered less than 10 times
        if (count < 1) {
            e.target.style.backgroundColor = `rgb(0, 0, 0, ${count + 0.1})`;
            e.target.setAttribute("colourCount", count + 0.1);
        }
        // Colour the square black if it's been hovered 10 times or more
        else {
            e.target.style.backgroundColor = "#000";
        }
    }
}