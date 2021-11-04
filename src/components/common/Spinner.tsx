import React, { ReactElement } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import landongmo_logo from '../../assets/icon/landongmo_logo.svg';
import { COLOR } from '../../constant/color';

function Spinner(): ReactElement {
  return (
    <SpinnerWrapper className="spinner">
      <SpinnerIcon src={landongmo_logo} />
    </SpinnerWrapper>
  );
}

const spinAnimation = keyframes` 
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
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
`;

const SpinnerIcon = styled.img`
  width: 4rem;
  height: 4rem;
  color: ${COLOR.LIGHT_GREEN};
  animation-name: ${spinAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export default Spinner;
