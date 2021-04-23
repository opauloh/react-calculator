import * as React from 'react';
import { KeyPad, Display } from './components';
import styles from './Calculator.module.scss';

const Calculator = () => {
  return (
    <div className={styles.calculator}>
      <Display />
      <KeyPad />
    </div>
  );
};

export default Calculator;
