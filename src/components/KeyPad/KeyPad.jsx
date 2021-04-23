import * as React from 'react';
import { Button } from '../';
import styles from './KeyPad.module.scss';

export const KeyPad = () => {
  const buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'c'];

  return (
    <div className={styles.keyPad}>
      {buttons.map((char) => (
        <Button
          key={char}
          // disabled={}
          type="button"
          // onClick={() => {}}
        >
          {char}
        </Button>
      ))}
    </div>
  );
};
