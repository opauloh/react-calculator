import React from 'react';
import { Button } from '../';
import styles from './KeyPad.module.scss';
import { useCalculatorContext } from '../../contexts';

export const KeyPad = () => {
  const buttons = [
    { char: '1', className: 'digit-1' },
    { char: '2', className: 'digit-2' },
    { char: '3', className: 'digit-3' },
    { char: '+', className: 'op-add' },
    { char: '4', className: 'digit-4' },
    { char: '5', className: 'digit-5' },
    { char: '6', className: 'digit-6' },
    { char: '-', className: 'op-sub' },
    { char: '7', className: 'digit-7' },
    { char: '8', className: 'digit-8' },
    { char: '9', className: 'digit-9' },
    { char: '*', className: 'op-mul' },
    { char: 'c', className: 'clear' },
    { char: '0', className: 'digit-0' },
    { char: '/', className: 'op-div' },
    { char: '=', className: 'eq' }
  ];
  const { handleOnClick } = useCalculatorContext();
  return (
    <div className={styles.keyPad}>
      {buttons.map(({ className, char }) => (
        <Button key={char} className={className} type="button" onClick={() => handleOnClick(char)}>
          {char}
        </Button>
      ))}
    </div>
  );
};
