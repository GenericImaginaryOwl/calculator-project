let operandA = "";
let operandB = "";
let operator = "";
let result = "";
const keypad = document.querySelector(".keypad-container");
const display = document.querySelector(".display");

const DIVISION_SIGN = "\u{00F7}";
const MULTIPLICATION_SIGN = "\u{00D7}";

const keyLookup = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "zero": 0,
    "add": "+",
    "subtract": "-",
    "multiply": MULTIPLICATION_SIGN,
    "divide": DIVISION_SIGN,
    "percent": "%",
    "dot": ".",
    "clear": "c",
    "all-clear": "ac",
    "equals": "=",
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    if (+b !== 0){
        return Math.floor((a / b ) * 10 ** 10) / (10 ** 10);
    }else{
        return "Cannot divide by zero";
    }
}

function operate() {
    if(operandA == "." || operandB == ".") {
        return "Syntax error";
    }
    switch (operator){
        case "+":
            return add(operandA, operandB).toString(); 
        case "-":
            return subtract(operandA, operandB).toString();
        case MULTIPLICATION_SIGN:
            return multiply(operandA, operandB).toString();
        case DIVISION_SIGN:
            return divide(operandA, operandB).toString();
    }
}

function onNumpadClick(key) {
    if (result !== "") {
        onAllClearClick();
    }
    if (operator == ""){
        operandA += key;
    }else{
        operandB += key;
    }
}

function onOperatorClick(key) {
    if(operandB !== ""){
        operandA = operate();
        operandB = "";
        result = "";
    }
    operator = key;
}

function onDotClick() {
    if (operator == "" && !operandA.includes(".")){
        operandA += ".";
    }else if (operator !== "" && !operandB.includes(".")) {
        operandB += ".";
    }
}

function onResultClick() {
    if(operandA !== "" && operator !== "" && operandB !== "") {
        result = operate();
    }
}

function onClearClick() {
    if (result !== ""){
        onAllClearClick();
    }
    if(operandB !== "") {
        operandB = operandB.substring(0, operandB.length - 1);
    }else if(operator !== "") {
        operator = "";
    }else if(operandA !== "") {
        operandA = operandA.substring(0, operandA.length -1);
    }
}

function onAllClearClick() {
            operandA = "";
            operandB = "";
            operator = "";
            result = ""; 
}

function displayResult(){
    if (result === "") {
        display.textContent = `${operandA} ${operator} ${operandB}`;
    }else{
        display.textContent = result;
    }
}

function getInput(event) {
    if (event.target.className == "key") {
        if (result == "Cannot divide by zero" || result == "Syntax error") {
            onAllClearClick();
        }
        const key = keyLookup[event.target.id];
        if (typeof key == 'number') {
            onNumpadClick(key);
        }else if (key == "+" || key == "-" || 
                  key == MULTIPLICATION_SIGN || key == DIVISION_SIGN) {
            onOperatorClick(key);
        }else if (key == ".") {
            onDotClick();
        }else if (key == "=") {
            onResultClick();
        }else if (key == "c") {
            onClearClick();
        }else if (key == "ac") {
            onAllClearClick();
        }
    }
    displayResult();
}

keypad.addEventListener("click", getInput);