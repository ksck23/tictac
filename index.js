/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let message = '';
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function allSame(arr, value) {
    var result = arr.reduce(function (total, num) {
        return total && (num == value);
    }, true);

    return result;
}

function transpose(arr) {
    return Object.keys(arr[0]).map(function(col) {
        return arr.map(function(row) { return row[col]; });
    });
}

function getFreeBoxes() {
    var tempArray = [];
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        var rowIdx = boxes[idx].getAttribute("rowIdx");
        var colIdx = boxes[idx].getAttribute("colIdx");
        if (grid[colIdx][rowIdx] == 0) {
            tempArray.push(boxes[idx]);
        }
    }
    return tempArray;
}

function renderMessage(msg) {
    const mdiv = document.getElementById("message");
    mdiv.innerHTML = '<p> '+msg+'</p>';
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function checkGameOver() {

    function checkGrid(arr, value) {
        return arr.reduce(function (result, row) {
            return result || allSame(row, value);
        }, false);
    }

    function checkDiagonals(arr, value) {
        var darr1 = arr.map(function (row, index) {
            return row[index];
        });

        var darr2 = arr.map(function (row, index) {
            return row[GRID_LENGTH-index-1];
        });

        return (allSame(darr1, value) || allSame(darr2, value));
    }

    var playerWins = checkGrid(grid, 1) || checkGrid(transpose(grid), 1) || checkDiagonals(grid, 1);
    var computerWins = checkGrid(grid, 2) || checkGrid(transpose(grid), 2) || checkDiagonals(grid, 2);
    var freeBoxes = getFreeBoxes();

    if (playerWins) {
        return 'PLAYER WINS !';
    } else if (computerWins) {
        return 'COMPUTER WINS !';
    } else if (freeBoxes.length == 0) {
        return 'DRAW MATCH, GAME OVER !';
    } else {
        return false;
    }
}

function computerGamePlay() {
    var freeBoxes = getFreeBoxes();
    if (freeBoxes.length) {
        var randBox = freeBoxes[Math.floor(Math.random() * freeBoxes.length)];
        var rowIdx = randBox.getAttribute("rowIdx");
        var colIdx = randBox.getAttribute("colIdx");
        let newValue = 2;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
    }
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();

    var gameOver = checkGameOver();

    if (!gameOver) {
        computerGamePlay();
        gameOver = checkGameOver();
        if (gameOver) {
            renderMainGrid();
            renderMessage(gameOver);
        }
    } else {
        renderMainGrid();
        renderMessage(gameOver);
    }
}

function addClickHandlers() {
    var boxes = getFreeBoxes();
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
