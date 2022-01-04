import React, { ReactElement } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import spinner_icon from '../../assets/icon/common/spinner.svg';
import { COLOR } from '../../style/color';

function Spinner(): ReactElement {
  const spinnerOnclick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.stopPropagation();
  };
  return (
    <SpinnerWrapper className="spinner" onClick={spinnerOnclick}>
      <SpinnerIcon src={spinner_icon} />
    </SpinnerWrapper>
  );
}

const spinAnimation = keyframes` 
    from {
        transform:rotate(0);
    }
    to {
        transform:rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLOR.SPINNER_WRAPPER_BLACK};
  z-index: 100;
`;

const SpinnerIcon = styled.img`
  width: 40px;
  height: 40px;
  animation-name: ${spinAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export default Spinner;
