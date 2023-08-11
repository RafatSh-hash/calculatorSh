// script.js
const display = document.getElementById('display');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let currentOperator = '';
let shouldClearDisplay = false;

buttons.forEach(button => {
  button.addEventListener('click', () => handleButtonClick(button.textContent));
});

document.addEventListener('keydown', event => {
  const key = event.key;
  if ((/\d|[+\-*/.=]|Enter/).test(key)) {
    event.preventDefault();
    handleButtonClick(key);
  }
});

function handleButtonClick(value) {
  if (value === 'C') {
    clearDisplay();
  } else if (value === '=') {
    calculate();
  } else if (value === '√') {
    currentInput = Math.sqrt(parseFloat(currentInput));
    updateDisplay();
  } else if (value === '^') {
    currentOperator = '^';
    shouldClearDisplay = true;
    updateHistory();
  } else if (value === '%') {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  } else {
    if (currentOperator === '^') {
      currentInput = Math.pow(parseFloat(currentInput), parseFloat(value));
      currentOperator = '';
      shouldClearDisplay = true;
      updateHistory();
    } else {
      currentInput += value;
      updateDisplay();
    }
  }
}

function clearDisplay() {
  currentInput = '';
  currentOperator = '';
  shouldClearDisplay = false;
  updateDisplay();
  updateHistory();
}

function calculate() {
  try {
    const result = eval(currentInput);
    currentInput = result.toString();
    currentOperator = '';
    shouldClearDisplay = true;
    updateDisplay();
    updateHistory();
  } catch (error) {
    currentInput = 'Try again';
    updateDisplay();
  }
}

function updateDisplay() {
  display.textContent = currentInput;
}

function updateHistory() {
  history.textContent = currentInput + (currentOperator ? ' ' + currentOperator : '');
}
