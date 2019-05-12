import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxProvider } from './store';
import { App } from './App';
import './index.css';

ReactDOM.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
