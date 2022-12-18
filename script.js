//--------- Variable declarations  ---------//
let displayLowerValue = "";
let displayUpperValue = "";
let operateResult = 0;
let currentOperatorValue = "";
let operatorValue = "";
let processEnd = false;
let firstNumber = "";
let secondNumber = "";
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
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

function roundOperate(number){
  return Math.round(number * 1000)/1000;
}

function processOperator(operator){
  if(currentOperatorValue != ""){
    processCalculation();
  }
  currentOperatorValue = operator;
  firstNumber = displayLower.textContent;
  if(firstNumber[firstNumber.length-1] == "."){
    firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    displayLower.textContent = firstNumber;
  }
  displayUpperValue = `${firstNumber} ${currentOperatorValue}`;
  cycleEqual = 1;
  processEnd = true;
  displayUpper.textContent = displayUpperValue;
}

function processCalculation(){
  if(processEnd == true) return;
  if(currentOperatorValue == "÷" && currentNumber == "0"){
    displayLowerValue = "Cannot divide by zero";
    displayUpperValue = "";
    displayUpper.textContent = displayUpperValue;
    displayLower.textContent = displayLowerValue;
    return
  }
  secondNumber = displayLower.textContent;
  if(secondNumber[secondNumber.length-1] == "."){
    secondNumber = secondNumber.slice(0, secondNumber.length - 1);
  }
  operateResult = roundOperate(operate(firstNumber, secondNumber, currentOperatorValue));
  displayLowerValue = `${operateResult}`;
  displayUpperValue = `${operateResult} ${currentOperatorValue}`;
  currentOperatorValue = "";
  displayUpper.textContent = displayUpperValue;
  displayLower.textContent = displayLowerValue;
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
        displayLower.textContent = displayLowerValue;
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
          processEnd = false;
          }
        }
        displayLower.textContent = displayLowerValue;
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
        displayLower.textContent = displayLowerValue;
      }
    }


    else if(button.classList.contains("btn-clear")){
      // Set the displayLowerValue and displayUpperValue to "0", reset the variables
      displayLowerValue = "0";
      displayUpperValue = "";
      currentOperatorValue = "";
      operatorValue = "";
      processEnd = false;
      firstNumber = "";
      secondNumber = "";
      cycleEqual = 0;
      displayUpper.textContent = displayUpperValue;
      displayLower.textContent = displayLowerValue;
    }


    else if(button.classList.contains("btn-plus")){    
      operatorValue = "+";
      processOperator(operatorValue);
      displayLowerValue = "0";
    }

    else if(button.classList.contains("btn-minus")){
      operatorValue = "−";
      processOperator(operatorValue);
      displayLowerValue = "0";
    }

    else if(button.classList.contains("btn-multiply")){
      operatorValue = "×";
      processOperator(operatorValue);
      displayLowerValue = "0";
    }

    else if(button.classList.contains("btn-divide")){
      operatorValue = "÷";
      processOperator(operatorValue);
      displayLowerValue = "0";
    }


    else if(button.classList.contains("btn-equal")){
      // Only works if the 2 numbers are available
      if(cycleEqual == 1){
        //displayUpperValue = `${displayUpperValue.slice(0, -2)}`;
        displayUpperValue = firstNumber;
        displayLowerValue = displayLower.textContent;
        if(displayLowerValue == "0"){
          displayLowerValue = "Cannot divide by zero";
          displayUpperValue = "";
        }
        else{
          if(displayLowerValue[displayLowerValue.length-1] == "."){
            displayLowerValue = displayLowerValue.slice(0, displayLowerValue.length - 1);
          }
          operateResult = roundOperate(operate(displayUpperValue, displayLowerValue, currentOperatorValue));
          displayUpperValue = `${firstNumber} ${currentOperatorValue} ${displayLowerValue} =`;
          displayLowerValue = `${operateResult}`;
        }
      
        currentOperatorValue = "";
        cycleEqual = undefined;
        displayUpper.textContent = displayUpperValue;
        displayLower.textContent = displayLowerValue;
      }
    }

    // If "number" buttons are pressed, than add to displayLowerValue
    else {
      processEnd = false;
      // If "0" is pressed or displayLowerValue equal with "0", than do not add additional "0", replace it with single "0"
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
          cycleEqual = 0;
          displayUpper.textContent = displayUpperValue;
        }
        // Limit the displayLowerValue to max 5, no more number can be add
        if(displayLowerValue.length < 11){
          displayLowerValue += button.textContent;
        }
        
      }
      displayLower.textContent = displayLowerValue;
    }
  });
});