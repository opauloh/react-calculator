import React, { createContext, useContext } from 'react';
import { useCalculator } from './useCalculator';

const CalculatorContext = createContext(null);

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculatorContext must be called within a CalculatorProvider');
  }
  return context;
};

export const CalculatorProvider = ({ children }) => {
  return (
    <CalculatorContext.Provider value={useCalculator()}>{children}</CalculatorContext.Provider>
  );
};
