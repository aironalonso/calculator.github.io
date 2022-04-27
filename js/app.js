// DOM Elements

// Time
const hour = document.querySelector(`.hour`);
const minute = document.querySelector(`.minute`);

// Display
const value = document.querySelector(`.value`);

// Functions
const c = document.querySelector(`.c`);
// const parenthesis = document.querySelector(`.parenthesis`);
const percent = document.querySelector(`.percent`);
const pm = document.querySelector(`.pm`);

// Numbers
const decimal = document.querySelector(`.decimal`);
const number0 = document.querySelector(`.number-0`);
const number1 = document.querySelector(`.number-1`);
const number2 = document.querySelector(`.number-2`);
const number3 = document.querySelector(`.number-3`);
const number4 = document.querySelector(`.number-4`);
const number5 = document.querySelector(`.number-5`);
const number6 = document.querySelector(`.number-6`);
const number7 = document.querySelector(`.number-7`);
const number8 = document.querySelector(`.number-8`);
const number9 = document.querySelector(`.number-9`);

const numberArray = [
    number0, number1, number2, number3, number4, number5, number6, number7, number8, number9
];

// variables
let valueStrInMemory = null;
let operatorInMemory = null;

// Operators
const addition = document.querySelector(`.addition`);
const subtraction = document.querySelector(`.subtraction`);
const multiplication = document.querySelector(`.multiplication`);
const division= document.querySelector(`.division`);
const equal = document.querySelector('.equal');

// Functions
const getValueAsStr = () => value.textContent.split(',').join('');

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        value.textContent += '.';
        return;
    }
    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        value.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        value.textContent = parseFloat(wholeNumStr).toLocaleString();
    }
};

const handleNumberClick = (numStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
        setStrAsValue(numStr);
    } else {
        setStrAsValue(currentValueStr + numStr);
    }
};

const getResultOfOperationAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemory = parseFloat(valueStrInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition') {
        newValueNum = valueNumInMemory + currentValueNum;
    } else if (operatorInMemory === 'subtraction') {
        newValueNum = valueNumInMemory - currentValueNum;
    } else if (operatorInMemory === 'multiplication') {
        newValueNum = valueNumInMemory * currentValueNum;
    } else if (operatorInMemory === 'division') {
        newValueNum = valueNumInMemory / currentValueNum;
    }
    return newValueNum.toString();
}

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();
    if (!valueStrInMemory) {
        valueStrInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    // setStrAsValue('0');
};

// Event Listeners to functions 
c.addEventListener('click', () => {
    setStrAsValue('0');
    valueStrInMemory = null;
    operatorInMemory = null;
});

pm.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const currentValueStr = getValueAsStr();

    if (currentValueStr === '-0') {
        setStrAsValue('0');
        return;
    }
    
    if (currentValueNum >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});

percent.addEventListener('click', () => {
    const currentValueNum = getValueAsNum();
    const newValueNum = currentValueNum / 100;
    setStrAsValue(newValueNum.toString());
    valueStrInMemory = null;
    operatorInMemory = null;
});

// Event Listeners to operators
addition.addEventListener('click', () => {
    handleOperatorClick('addition');
});

subtraction.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});

multiplication.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

division.addEventListener('click', () => {
    handleOperatorClick('division');
});

equal.addEventListener('click', () => {
    if (valueStrInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueStrInMemory = null;
        operatorInMemory = null;
    }
});

// Event Listeners to numbers and decimal
for(let i = 0; i < numberArray.length; i++) {
    const number = numberArray[i];
    number.addEventListener('click', () => {
        handleNumberClick(i.toString());
    })
};
decimal.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.');
    }
});