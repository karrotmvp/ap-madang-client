import React from 'react';

import { Global, css } from '@emotion/react';
import './reset.css';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        textarea {
          height: 100%;
          font-size: 62.5%;
          font-family: 'Pretendard';
          font-weight: 400;
          letter-spacing: -0.03rem;
        }

        #root {
          height: 100%;
          white-space: pre-line;
        }

        .title1 {
          font-size: 2.2rem;
          line-height: 3rem;
          font-weight: 700;
          letter-spacing: -0.04rem;
        }
        .title2 {
          font-size: 1.8rem;
          line-height: 2.8rem;
          font-weight: 600;
          letter-spacing: -0.04rem;
        }
        .title3 {
          font-size: 1.6rem;
          line-height: 2.4rem;
          font-weight: 600;
        }

        .body1 {
          font-size: 1.6rem;
          line-height: 2.4rem;
          font-weight: 500;
        }
        .body2 {
          font-size: 1.6rem;
          line-height: 2.4rem;
        }
        .body3 {
          font-size: 1.5rem;
          line-height: 2.5rem;
        }
        .body4 {
          font-size: 1.4rem;
          line-height: 2.3rem;
        }
      `}
    />
  );
};

export default GlobalStyle;
