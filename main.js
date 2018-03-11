// Conway's game of life

/* Steps to build the app
    1) Create the grid of the game
    2) Display the grid
    3) Populate the grid
    4) Implement the rules of the game
    5) optional: Iterate to make it alive (button then automatically) */


let canvas = document.getElementById('background');
let context = canvas.getContext('2d');
let pixelSize = 2;
const numberCells = 100;
canvas.width = numberCells * pixelSize;
canvas.height = numberCells * pixelSize;
let presentGen = createGrid(numberCells);

// Crate the grid of the game
function createGrid(dim) {
    let grid = [];
    for (let i = 0; i < dim; i++) { // create the rows
        let innerGrid = [];
        for (j = 0; j < dim; j++) { // create the height
            innerGrid.push(0); //default empty element
        }
        grid.push(innerGrid);
    }
    return grid;
}
//populate the grid and avoid the border
function populate(grid) {
    let cell;
    for (let x = 1; x < grid.length - 1; x++) { //start at 1 and finish at end-1 so the borders can't be alive
        for (let y = 1; y < grid[x].length - 1; y++) {
            cell = Math.round(Math.random());
            grid[x][y] = cell;
        }
    }
}

// check who lives and who dies in the next gen
function nextGen(pastGen) {
    let futureGen = createGrid(pastGen.length, pastGen[0].length);
    for (let i = 1; i < pastGen.length - 1; i++) {
        for (let j = 1; j < pastGen[0].length - 1; j++) {
            //count the cell neightbours
            let cellCount = 0; //starting count
            cellCount += pastGen[i - 1][j - 1]; //check top-left
            cellCount += pastGen[i - 1][j]; //check top     
            cellCount += pastGen[i - 1][j + 1]; //check top-right    

            cellCount += pastGen[i][j - 1]; //check left
            cellCount += pastGen[i][j + 1]; //check right

            cellCount += pastGen[i + 1][j - 1]; //check bottom-left
            cellCount += pastGen[i + 1][j]; //check bottom     
            cellCount += pastGen[i + 1][j + 1]; //check bottom-right 

            switch (cellCount) {
                case 2:
                    futureGen[i][j] = pastGen[i][j];
                    break; //if dead stay dead if alive keep alive
                case 3:
                    futureGen[i][j] = 1;
                    break; //you are alive!!!
                default:
                    futureGen[i][j] = 0; // all other cases you die
            }

        }
    }
    return futureGen;
}

// Display the result in the canvas
function display(arr) {
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr[x].length; y++) {
            drawCell(x, y, arr[x][y]);
        }
    }
}

function drawCell(x, y, alive) {
    context.beginPath();
    context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.fillStyle = alive ? '#222' : '#FFF';
    context.fill();
}
// future generation becomes present generations
function update() {
    let futureGen = nextGen(presentGen);
    presentGen = futureGen;
    display(presentGen);
}

// click to start the game 
function start() {
    populate(presentGen);
    window.setInterval(update, 70);
}