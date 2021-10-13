import React from 'react';

import { Global } from '@emotion/react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import reset from './style/reset';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Global styles={reset} />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
