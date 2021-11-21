import React from "react";

import { Global, css } from "@emotion/react";

// import Pretendard_Bold from '../assets/font/pretendard/Pretendard-Bold.woff2';
// import Pretendard_ExtraBold from '../assets/font/pretendard/Pretendard-ExtraBold.woff2';
// import Pretendard_Medium from '../assets/font/pretendard/Pretendard-Medium.woff2';
// import Pretendard_Regular from '../assets/font/pretendard/Pretendard-Regular.woff2';
// import Pretendard_SemiBold from '../assets/font/pretendard/Pretendard-SemiBold.woff2';
import "./reset.css";
import "react-loading-skeleton/dist/skeleton.css";
import { COLOR } from "../constant/color";

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        html,
        body,
        textarea {
          height: 100%;
          color: ${COLOR.TEXT_BLACK};
          font-size: 62.5%;
          font-family: "Pretendard";
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
          line-height: 2.7rem;
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
          line-height: 2.3rem;
        }
        .body4 {
          font-size: 1.4rem;
          line-height: 2.1rem;
        }

        @font-face {
          font-family: "Pretendard";
          font-weight: 800;
          font-display: swap;
          src: url("../assets/font/pretendard/Pretendard-ExtraBold.woff2")
            format("woff2");
        }

        @font-face {
          font-family: "Pretendard";
          font-weight: 700;
          font-display: swap;
          src: url("../assets/font/pretendard/Pretendard-Bold.woff2")
            format("woff2");
        }

        @font-face {
          font-family: "Pretendard";
          font-weight: 600;
          font-display: swap;
          src: url("../assets/font/pretendard/Pretendard-SemiBold.woff2")
            format("woff2");
        }

        @font-face {
          font-family: "Pretendard";
          font-weight: 500;
          font-display: swap;
          src: url("../assets/font/pretendard/Pretendard-Medium.woff2")
            format("woff2");
        }

        @font-face {
          font-family: "Pretendard";
          font-weight: 400;
          font-display: swap;
          src: url("../assets/font/pretendard/Pretendard-Regular.woff2")
            format("woff2");
        }
      `}
    />
  );
};

export default GlobalStyle;
