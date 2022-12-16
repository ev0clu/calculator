//--------- Variable declarations  ---------//
let displayLowerValue = "";
let displayUpperValue = "";

//--------- Functions declaration  ---------//
function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
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
    }


    else if(button.classList.contains("btn-dot")){
    }


    else if(button.classList.contains("btn-backspace")){
    }


    else if(button.classList.contains("btn-clear")){
    }


    else if(button.classList.contains("btn-plus")){
    }

    else if(button.classList.contains("btn-minus")){
    }

    else if(button.classList.contains("btn-multiply")){
    }

    else if(button.classList.contains("btn-divide")){
    }


    else if(button.classList.contains("btn-equal")){    
    }

    // If "number" buttons are pressed, than add to displayLowerValue
    else {
    }
  });
});