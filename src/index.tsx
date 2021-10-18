import React, { Suspense } from 'react';

import { Global } from '@emotion/react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import reset from './style/reset';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<div>Loading</div>}>
        <Global styles={reset} />
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
