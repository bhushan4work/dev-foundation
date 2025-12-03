// ---------- BASIC MATH FUNCTIONS ----------
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert('Cannot divide by zero!');
        return 0;
    }
    return a / b;
}

// ---------- OPERATE FUNCTION ----------
function operate(a, b, operator) {
    a = parseInt(a); 
    b = parseInt(b);

    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
}


// ---------- UI LOGIC ----------
const input = document.querySelector("#input");
const buttons = document.querySelectorAll("button");

let a = null; 
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.textContent; 

        // Clear
        if (value === "C") { 
            input.value = ""; //Clear the screen
            a = null;
            operator = null;
            return;
        }

        // Operator (+ - * /)
        if (["+", "-", "*", "/"].includes(value)) {
            if (input.value !== "") {
                a = input.value;  // save first operand
                operator = value; // save operator
                input.value = ""; // clear display for next number
            }
            return;
        }

        // Equals (=)
        if (value === "=") {
            if (a !== null && operator !== null) { //calculate only if we have a stored, operator stored 
                const b = input.value;  //Read second number from input

                const result = operate(a, b, operator); //calls operate to get result\ans

                input.value = result; //Show result on screen

                a = result; // allow chaining ex: 5 + 3 = 8 a → 8 * 2 = 16
                operator = null;
            }
            return;
        }

        input.value += value; //if we press 5 then 3 so → it will be 53
    });
});
