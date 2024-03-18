document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const clickedButton = this.textContent;

            if (clickedButton === 'AC') {
                clearDisplay();
            } else if (clickedButton === '=') {
                calculateResult();
            } else if (clickedButton === '+/-') {
                toggleSign();
            } else if (clickedButton === '.') {
                addDecimal();
            } else if (isOperator(clickedButton)) {
                handleOperator(clickedButton);
            } else {
                appendNumber(clickedButton);
            }
        });
    });

    function appendNumber(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function addDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    function toggleSign() {
        if (currentInput !== '0') {
            currentInput = (currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput);
            updateDisplay();
        }
    }

    function handleOperator(op) {
        if (operator !== '') {
            calculateResult();
        }
        previousInput = currentInput;
        currentInput = '';
        operator = op;
    }

    function calculateResult() {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '×':
                result = prev * curr;
                break;
            case '÷':
                if (curr === 0) {
                    result = 'Error';
                } else {
                    result = prev / curr;
                }
                break;
            case '%':
                result = prev % curr;
                break;
            default:
                return;
        }
        clearDisplay();
        currentInput = result.toString();
        updateDisplay();
        previousInput = '';
        operator = '';
    }

    function clearDisplay() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function updateDisplay() {
        display.value = currentInput;
    }

    function isOperator(char) {
        return char === '+' || char === '-' || char === '×' || char === '÷' || char === '%';
    }
});
