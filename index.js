const operation = {
    num1: "",
    num2: "",
    operator: "",
    solution: "",
    currentValue: "",
};

/** Clears the 'Operation' object. Takes in a boolean value.
 * True = clear all data.
 * False = Clear non-dsplay data only. */
function clear(clearEverything) {
    clearHighlighted();
    operation.num1 = "";
    operation.num2 = "";
    operation.operator = "";
    if (clearEverything == true) {
        operation.solution = "";
        operation.currentValue = "";
    }
    updateDisplay();
}

function clearHighlighted() {
    highlightedButton = document.getElementById(operation.operator);
    if (highlightedButton) {
        highlightedButton.style.backgroundColor = "beige";
    }
}

function createGrid() {
    const buttonLabels = [
        "1",
        "2",
        "3",
        "+",
        "4",
        "5",
        "6",
        "-",
        "7",
        "8",
        "9",
        "x",
        "c",
        "0",
        "=",
        "/",
    ];
    grid = {
        cellSizePixels: 80,
        numOfCells: 4,
        gridBox: document.getElementById("grid-container"),
        buttons: [],
    };
    grid.gridBox.setAttribute(
        "style",
        `grid-template-columns:repeat(${grid.numOfCells}, ${grid.cellSizePixels}px);grid-template-rows:repeat(${grid.numOfCells}, ${grid.cellSizePixels}px);`
    );

    for (i = 0; i < Math.pow(grid.numOfCells, 2); i++) {
        newGrid = document.createElement("div");
        newGrid.style.width = `${grid.cellSizePixels}px`;
        newGrid.style.height = `${grid.cellSizePixels}px`;
        newGrid.style.backgroundColor = "beige";
        newGrid.classList.add("grid-box", "rounded");
        newGrid.textContent = buttonLabels[i];
        newGrid.id = buttonLabels[i];
        grid.gridBox.appendChild(newGrid);
        grid.buttons.push(newGrid);
    }
}

function setup() {
    const display = document.getElementById("display");
    operation.currentValue = "CALCULATOR";
    grid.gridBox.addEventListener("click", (e) => {
        // If clicking on container then do nothing.
        if (e.target.id == grid.gridBox.id) {
            return;
        }
        handleInput(e.target);
        updateDisplay();
    });
    updateDisplay();
}

function updateDisplay() {
    display.textContent = operation.currentValue;
}

function numPress(numPress) {
    if (!operation.operator) {
        operation.num1 += numPress;
        operation.currentValue = operation.num1;
    } else {
        operation.num2 += numPress;
        operation.currentValue = operation.num2;
    }
    console.table(operation);
}

function handleInput(target) {
    switch (target.textContent) {
        case "+":
        case "-":
        case "x":
        case "/":
            if (!operation.operator) {
                operation.operator = target.textContent;
                target.style.backgroundColor = "red";
            }
            break;
        case "=":
            operation.solution = operate();
            updateDisplay();
            console.table(operation);
            clear(false);
            break;
        case "c":
            clear(true);
            break;
        default:
            clearHighlighted();
            numPress(target.textContent);
    }
}

function operate() {
    switch (operation.operator) {
        case "+":
            return add();
        case "-":
            return subtract();
        case "*":
            return multiply();
        case "/":
            if (!zeroSafe()) {
                alert("Division by 0 not possible!");
                return null;
            }
            return divide();
    }
}

/** zeroSafe checks if user is attempting to divide by zero. Returns True if safe, False if unsafe operation. */
function zeroSafe() {
    if (Number(operation.num2) != 0) {
        return true;
    } else {
        return false;
    }
}

/** Returns the sum of two numbers. */
function add() {
    sum = Number(operation.num1) + Number(operation.num2);
    operation.currentValue = sum;
    return sum;
}

/** Returns the difference of two numbers. */
function subtract() {
    difference = operation.num1 - operation.num2;
    operation.currentValue = difference;
    return difference;
}

/** Returns the product of two numbers. */
function multiply() {
    product = operation.num1 * operation.num2;
    operation.currentValue = product;
    return product;
}

/** Returns the quotient of two numbers. */
function divide() {
    quotient = Math.round((operation.num1 / operation.num2) * 100) / 100;
    operation.currentValue = quotient;
    return quotient;
}

createGrid();
setup();
