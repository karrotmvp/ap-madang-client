import React, { ReactElement } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import spinner_icon from '../../assets/icon/common/spinner.svg';
import { COLOR } from '../../constant/color';

function Spinner(): ReactElement {
  return (
    <SpinnerWrapper className="spinner">
      <SpinnerIcon src={spinner_icon} />
    </SpinnerWrapper>
  );
}

const spinAnimation = keyframes` 
    from {
        transform:translate(-50%, -50%) rotate(0);
    }
    to {
        transform:translate(-50%, -50%) rotate(360deg);
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
  width: 40px;
  height: 40px;
  color: ${COLOR.LIGHT_GREEN};
  animation-name: ${spinAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export default Spinner;
