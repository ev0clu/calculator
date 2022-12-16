//--------- Variable declarations  ---------//
let displayLowerValue = "";
let displayUpperValue = "";
let operateResult = 0;
let operatorValue = "";
let cycle = 0;

//--------- Functions declaration  ---------//
function add(a, b){
  a = Number(a);
  b = Number(b);
  return a + b;
}

function subtract(a, b){
  a = Number(a);
  b = Number(b);
  return a - b;
}

function multiply(a, b){
  a = Number(a);
  b = Number(b);
  return a * b;
}

function divide(a, b){
  a = Number(a);
  b = Number(b);
  return a / b;
}

function operate(a, b, operator){
  switch(operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function roundOperate(number){
  return Math.round(number * 1000)/1000;
}


//--------- Query Selectors ---------//
const buttons = document.querySelectorAll("button");
const displayUpper = document.querySelector(".display-upper");
const displayLower= document.querySelector(".display-lower");


//--------- Set default values ---------//
displayLowerValue = "0";
displayLower.textContent = displayLowerValue;

// --------- Event listeners ---------//
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if(button.classList.contains("btn-plusminus")){
       // Add "-" at the beginning of displayLowerValue if it is still not exist
      if(!displayLowerValue.includes("-")) {
        if((displayLowerValue[0] == "0" && displayLowerValue[1] == ".") || (displayLowerValue[0] != "0")){
          displayLowerValue = `-${displayLowerValue}`;
        }
      }
      // Remove "-" from the beginning of displayLowerValue if it is still exist
      else if(displayLowerValue[0] != "0"){
        displayLowerValue = displayLowerValue.slice(1);
      }
      displayUpper.textContent = displayUpperValue;
      displayLower.textContent = displayLowerValue;
    }


    else if(button.classList.contains("btn-dot")){
      if(!displayLowerValue.includes(".")) {
        // Add dot: after "0" or if "-" followed by 1 number or after any number
        if(displayLowerValue[0] == "0" || 
        (displayLowerValue[0] == "-" && displayLowerValue.length >= 2) || 
        (displayLowerValue[0] != "0" && displayLowerValue[0] != "-")){
        displayLowerValue = `${displayLowerValue}.`;
        }
      }
      displayUpper.textContent = displayUpperValue;
      displayLower.textContent = displayLowerValue;
    }


    else if(button.classList.contains("btn-backspace")){
      // Remove the last char from displayLowerValue
      displayLowerValue = displayLowerValue.slice(0, displayLowerValue.length - 1);
      
      // If the value of displayLowerValue is "-0", set the displayLowerValue to "0"
      // If the value of displayLowerValue is "-", set the displayLowerValue to "0"
      // If the length of displayLowerValue is 0, set the displayLowerValue to "0"
      if((displayLowerValue[0] == "-" && displayLowerValue[1] == "0" && displayLowerValue.length == 2) || 
      (displayLowerValue.length == 1 && displayLowerValue == "-") ||
      (displayLowerValue.length == 0)){
        displayLowerValue = "0";
      }
      displayUpper.textContent = displayUpperValue;
      displayLower.textContent = displayLowerValue;
    }


    else if(button.classList.contains("btn-clear")){
      // Set the displayLowerValue to "0"
      displayLowerValue = "0";
      displayUpperValue = "";
      operatorValue = "";
      cycle = 0;
      displayUpper.textContent = displayUpperValue;
      displayLower.textContent = displayLowerValue;
    }


    else if(button.classList.contains("btn-plus")){
      operatorValue = "+";

      if(displayLowerValue[1] != "." || (displayLowerValue[1] == "." && displayLowerValue.length >=3)){
        if(cycle == 0) {
        displayUpperValue = `${displayLowerValue} ${operatorValue}`;
        }

        if(cycle == 1) {
          displayUpperValue = `${displayUpperValue.slice(0, -2)}`;
          operateResult = roundOperate(operate(displayLowerValue, displayUpperValue, operatorValue));
          displayLowerValue = `${operateResult}`;
          displayUpperValue = `${operateResult} ${operatorValue}`;
        }
        cycle = 1;
        displayUpper.textContent = displayUpperValue;
        displayLower.textContent = displayLowerValue;
        displayLowerValue = "0";
      }
    }

    else if(button.classList.contains("btn-minus")){
    }

    else if(button.classList.contains("btn-multiply")){
    }

    else if(button.classList.contains("btn-divide")){
    }


    else if(button.classList.contains("btn-equal")){
      if(cycle == 1){
        displayUpperValue = `${displayUpperValue.slice(0, -2)}`;
        operateResult = roundOperate(operate(displayLowerValue, displayUpperValue, operatorValue));
        displayUpperValue = `${displayUpperValue} ${operatorValue} ${displayLowerValue} =`;
        displayLowerValue = `${operateResult}`;
      
        displayUpper.textContent = displayUpperValue;
        displayLower.textContent = displayLowerValue;
        cycle = 0;
      }
      
    }

    // If "number" buttons are pressed, than add to displayLowerValue
    else {
      if(displayLowerValue == "0" && button.textContent == "0") {
        displayLowerValue = "0";
      }
      else {
        if(displayLowerValue == "0"){
          displayLowerValue = displayLowerValue.slice(1);
        }
        displayLowerValue += button.textContent;
      }
      displayUpper.textContent = displayUpperValue;
      displayLower.textContent = displayLowerValue;
    }
  });
});