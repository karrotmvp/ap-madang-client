import React from 'react';

import { Global } from '@emotion/react';
import ReactDOM from 'react-dom';

import App from './App';
import reset from './style/reset';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={reset} />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
