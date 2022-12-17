//--------- Variable declarations  ---------//
let displayLowerValue = "";
let displayUpperValue = "";
let operateResult = 0;
let currentOperatorValue = "";
let previousOperatorValue = "";
let cycleOperate = 0;
let cycleEqual = 0;

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

function updateDisplay()
{
  displayUpper.textContent = displayUpperValue;
  displayLower.textContent = displayLowerValue;
}

function processOperator(){
  displayUpperValue = `${displayLowerValue} ${currentOperatorValue}`;
  cycleEqual = 1;
  cycleOperate = 1;
}

function processCalculation(currentOperator, previousOperator){
  displayUpperValue = `${displayUpperValue.slice(0, -2)}`;
  operateResult = roundOperate(operate(displayUpperValue, displayLowerValue, currentOperator));
  displayLowerValue = `${operateResult}`;
  displayUpperValue = `${operateResult} ${previousOperator}`;
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
      if(cycleEqual != undefined){
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
        updateDisplay();
        }
      }


    else if(button.classList.contains("btn-dot")){
      if(cycleEqual != undefined){
        if(!displayLowerValue.includes(".")) {
          // Add dot: after "0" or if "-" followed by 1 number or after any number
          if(displayLowerValue[0] == "0" || 
          (displayLowerValue[0] == "-" && displayLowerValue.length >= 2) || 
          (displayLowerValue[0] != "0" && displayLowerValue[0] != "-")){
          displayLowerValue = `${displayLowerValue}.`;
          }
        }
        updateDisplay();
        }
      }


    else if(button.classList.contains("btn-backspace")){
      if(cycleEqual != undefined){
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
        updateDisplay();
      }
    }


    else if(button.classList.contains("btn-clear")){
      // Set the displayLowerValue and displayUpperValue to "0", reset the variables
      displayLowerValue = "0";
      displayUpperValue = "";
      currentOperatorValue = "";
      previousOperatorValue = "";
      cycleOperate = 0;
      cycleEqual = 0;
      updateDisplay();
    }


    else if(button.classList.contains("btn-plus")){    
      previousOperatorValue = currentOperatorValue;
      currentOperatorValue = "+";

      // If the 2nd char of displayLowerValue is "." or "." and the length is equal or higher than 3, 
      // than push the content to the upper part of the screen
      if((displayLowerValue[1] != "." || (displayLowerValue[1] == "." && displayLowerValue.length >=3)) && cycleOperate != undefined){
        // The "+" is pressed at the first time
        if(cycleOperate == 0) {
          processOperator();
        }

        // The "+" is pressed after the first time
        else if(cycleOperate == 1 && (currentOperatorValue != previousOperatorValue)) {
          processCalculation(previousOperatorValue, currentOperatorValue);
          updateDisplay();
          //currentOperatorValue = previousOperatorValue;
          //processCalculation(currentOperatorValue, previousOperatorValue);
        }
        else if(cycleOperate == 1 && (currentOperatorValue == previousOperatorValue)){
          processCalculation(currentOperatorValue, previousOperatorValue);
        }
        
        updateDisplay();
        displayLowerValue = "0";
      }
    }

    else if(button.classList.contains("btn-minus")){
      previousOperatorValue = currentOperatorValue;
      currentOperatorValue = "-";

      // If the 2nd char of displayLowerValue is "." or "." and the length is equal or higher than 3, 
      // than push the content to the upper part of the screen
      if((displayLowerValue[1] != "." || (displayLowerValue[1] == "." && displayLowerValue.length >=3)) && cycleOperate != undefined){
        // The "+" is pressed at the first time
        if(cycleOperate == 0) {
          processOperator();
        }

        // The "+" is pressed after the first time
        else if(cycleOperate == 1 && (currentOperatorValue != previousOperatorValue)) {
          processCalculation(previousOperatorValue, currentOperatorValue);
          updateDisplay();
          //currentOperatorValue = previousOperatorValue;
          //processCalculation(currentOperatorValue, previousOperatorValue);
        }
        else if(cycleOperate == 1 && (currentOperatorValue == previousOperatorValue)){
          processCalculation(currentOperatorValue, previousOperatorValue);
        }
        
        updateDisplay();
        displayLowerValue = "0";
      }
    }

    else if(button.classList.contains("btn-multiply")){
    }

    else if(button.classList.contains("btn-divide")){
    }


    else if(button.classList.contains("btn-equal")){
      // Only works if the 2 numbers are available
      if(cycleEqual == 1){
        displayUpperValue = `${displayUpperValue.slice(0, -2)}`;
        displayLowerValue = displayLower.textContent;
        operateResult = roundOperate(operate(displayUpperValue, displayLowerValue, currentOperatorValue));
        displayUpperValue = `${displayUpperValue} ${currentOperatorValue} ${displayLowerValue} =`;
        displayLowerValue = `${operateResult}`;
      
        currentOperatorValue = "";
        previousOperatorValue = "";
        cycleOperate = 0;
        cycleEqual = undefined;
        updateDisplay();
      }
    }

    // If "number" buttons are pressed, than add to displayLowerValue
    else {
      // If "0" is pressed, than do not add additional "0", replace it with single "0"
      if(displayLowerValue == "0" && button.textContent == "0") {
        displayLowerValue = "0";
      }
      else {
        // If any number is pressed, than remove the default "0" and add the new numbert to one after another
        if(displayLowerValue == "0"){
          displayLowerValue = displayLowerValue.slice(1);
        }
        // If "equal" button is pressed, reset the variables
        else if(cycleEqual == undefined){
          displayLowerValue = "";
          displayUpperValue = "";
          currentOperatorValue = "";
          previousOperatorValue = "";
          cycleOperate = 0;
          cycleEqual = 0;
        }
        displayLowerValue += button.textContent;
      }
      updateDisplay();
    }
  });
});