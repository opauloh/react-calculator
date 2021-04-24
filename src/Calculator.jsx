import React from 'react';
import { KeyPad, Display } from './components';
import styles from './Calculator.module.scss';
import { CalculatorProvider } from './contexts';

const Calculator = () => {
  return (
    <CalculatorProvider>
      <div className={styles.calculator}>
        <Display />
        <KeyPad />
      </div>
    </CalculatorProvider>
  );
};

export default Calculator;
