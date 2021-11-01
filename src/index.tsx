import React, { Suspense } from 'react';

import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import GlobalStyle from './style/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<div>Loading</div>}>
        <GlobalStyle />
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
