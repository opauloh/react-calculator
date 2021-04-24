import { useReducer, useState } from 'react';

const actionTypes = {
  insertDigit: 'insertDigit',
  replaceDigit: 'replaceDigit',
  insertOperation: 'insertOperation',
  setResult: 'setResult',
  reset: 'reset'
};

const initialState = {
  display: '',
  currentOperation: null,
  operations: [],
  lastInputIsDigit: false,
  lastDigit: '',
  isResult: false
};

const calculatorReducer = (state, { type, char, result }) => {
  switch (type) {
    case actionTypes.insertDigit: {
      return {
        ...state,
        display: `${state.display}${state.currentOperation ? state.currentOperation : ''}${char}`,
        operations: state.currentOperation
          ? [...state.operations, state.currentOperation]
          : state.operations,
        currentOperation: null,
        lastInputIsDigit: true,
        lastDigit: `${state.lastDigit}${char}`,
        isResult: false
      };
    }
    case actionTypes.replaceDigit: {
      return {
        ...state,
        display: `${state.display.slice(0, -1)}${char}`,
        lastInputIsDigit: true,
        lastDigit: `${state.lastDigit.slice(0, -1)}${char}`,
        isResult: false
      };
    }
    case actionTypes.setResult: {
      return { ...initialState, display: result, isResult: true };
    }
    case actionTypes.insertOperation: {
      return {
        ...state,
        currentOperation: char,
        lastInputIsDigit: false,
        lastDigit: '',
        isResult: false
      };
    }
    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
};

const operationChars = ['+', '-', '*', '/'];
const isOperationChar = (char) => operationChars.includes(char);
const isMinusOperator = (char) => char === '-';
const isResetChar = (char) => char === 'c';
const isExecutionChar = (char) => char === '=';

const stringToMathOperator = (numberA, numberB, operator) => {
  switch (operator) {
    case '+':
      return numberA + numberB;
    case '-':
      return numberA - numberB;
    case '*':
      return Math.floor(numberA * numberB);
    case '/':
      return Math.floor(numberA / numberB);
    case '/-':
      return Math.floor(numberA / -numberB);
    case '*-':
      return Math.floor(numberA * -numberB);
    default:
      throw Error(`operator not supported: ${operator}`);
  }
};

const getDisplayMathResult = (display, operations) => {
  const digits = display.split(/\+|\-|\*|\//g).filter(Boolean);
  const result = digits.reduce((prev, curr, idx) => {
    curr = parseInt(curr);
    if (operations.length === digits.length) {
      return stringToMathOperator(prev, curr, operations[idx]);
    } else if (idx > 0) {
      return stringToMathOperator(prev, curr, operations[idx - 1]);
    }
    return curr;
  }, 0);
  // If any number is divided by zero, the calculator should reset to the blank origin state as if c had been pressed.
  if (result === Infinity || result === -Infinity) return '';
  return result;
};

export const useCalculator = () => {
  const [
    { display, currentOperation, operations, lastInputIsDigit, lastDigit, isResult },
    dispatch
  ] = useReducer(calculatorReducer, initialState);

  const isEmptyDisplay = display === '';
  const getDisplay = `${display}${currentOperation ? currentOperation : ''}`;

  const handleOnClick = (char) => {
    if (isResetChar(char)) {
      return dispatch({ type: actionTypes.reset });
    }

    if (isExecutionChar(char)) {
      // Pressing = should only compute the result of the expression if the last entered character is a digit.
      if (isEmptyDisplay || !lastInputIsDigit) return;
      return dispatch({
        type: actionTypes.setResult,
        result: getDisplayMathResult(display, operations)
      });
    }

    if (isOperationChar(char)) {
      // When the display is empty, the only buttons that will work are the digit buttons and the - subtraction button (which acts as a negative sign in this context). Any other button will have no effect.
      if (isEmptyDisplay && char !== '-') {
        return;
      }
      // Once the display enters a state with two consecutive operators such as 6/-, any further operator presses can be ignored entirely until a digit is pressed.
      if (currentOperation && currentOperation.length == 2) {
        return;
      }
      //If the trailing operator is * or /, all operator presses will replace the old trailing operator with the new operator with the exception of -, which will be appended to the display, making it possible to create legal display states such as 6/-.
      if (
        isMinusOperator(char) &&
        currentOperation &&
        currentOperation !== '-' &&
        currentOperation !== '+' &&
        currentOperation.length === 1
      ) {
        return dispatch({ type: actionTypes.insertOperation, char: `${currentOperation}${char}` });
      }
      return dispatch({ type: actionTypes.insertOperation, char });
    }
    // No leading zeroes are allowed in any circumstance (the single digit 0 is not considered to have leading zeroes, but 00 or 08 are illegal numbers).
    if (isResult) {
      dispatch({ type: actionTypes.reset });
    } else if (char === '0' && lastDigit === '0') {
      return;
    } else if (lastDigit === '0') {
      //When a button is pushed that would create a leading zero, replace the zero with the new number. For example, if the display shows 5+0 and 8 is pressed, the display should show 5+8.
      return dispatch({ type: actionTypes.replaceDigit, char });
    }
    dispatch({ type: actionTypes.insertDigit, char });
  };

  return {
    display: getDisplay,
    handleOnClick
  };
};
