import React from 'react';
import Calculator from './Calculator';
import { ErrorBoundary } from './components';

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview.
 */
const App = () => (
  <ErrorBoundary>
    <div id="app">
      <Calculator />
    </div>
  </ErrorBoundary>
);

export default App;
