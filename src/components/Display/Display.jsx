import React from 'react';
import styles from './Display.module.scss';
import { useCalculatorContext } from '../../contexts';
import { cx } from '../../utils';

export const Display = () => {
  const { display } = useCalculatorContext();

  return (
    <div className={cx('output', styles.display)} title={display}>
      {display}
    </div>
  );
};
