let operandA = null;
let operandB = null;
let operator = null;

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
    let result = null;
    switch (operator){
        case "+":
            result = add(operandA, operandB);
            break;           
        case "-":
            result = subtract(operandA, operandB);
            break;
        case "*":
            result = multiply(operandA, operandB);
            break;
        case "/":
            result = divide(operandA, operandB);
            break;
    }
    if (result !== null) {
        console.log(result);
    }else{
        console.log("Something went wrong when performing the operation.");
    }
}