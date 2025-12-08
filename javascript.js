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
    if (b !== 0){
        return Math.floor((a / b ) * 10 ** 10) / (10 ** 10);
    }else{
        return "Cannot divide by zero.";
    }
}

function operate() {
    switch (operator){
        case "+":
            result = add(operandA, operandB);
            break;           
        case "-":
            result = subtract(operandA, operandB);
            break;
        case MULTIPLICATION_SIGN:
            result = multiply(operandA, operandB);
            break;
        case DIVISION_SIGN:
            result = divide(operandA, operandB);
            break;
    }
    if (result === "") {
        console.log("Something went wrong when performing the operation.");
    }
}

function getInput(event) {
    if (event.target.className == "key") {
        const key = keyLookup[event.target.id];
        if (typeof key == 'number') {
            if (operator == ""){
                operandA += key;
            }else{
                operandB +=key;
            }
        }else if (key == "+" || key == "-" || key == MULTIPLICATION_SIGN || key == DIVISION_SIGN) {
            operator = key;
        }else if (key == "=") {
            operate();
        }else if (key == "ac"){
            operandA = "";
            operandB = "";
            operator = "";
            result = ""; 
        }
    }
    if (result === "") {
        display.textContent = operandA + operator + operandB;
    }else{
        display.textContent = operandA + operator + operandB + "=" + result;
    }
}

keypad.addEventListener("click", getInput);