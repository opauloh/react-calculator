import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ children, ...props }) => (
  <button {...props} className={styles.button}>
    {children}
  </button>
);
