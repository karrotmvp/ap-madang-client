import styled from '@emotion/styled';
import React, { ReactElement } from 'react';

import { COLOR } from '../../constant/color';
import { ImSpinner2 } from 'react-icons/im';
import { keyframes } from '@emotion/react';

function Spinner(): ReactElement {
  return (
    <SpinnerWrapper>
      <SpinnerIcon />
    </SpinnerWrapper>
  );
}

export default Spinner;

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

const SpinnerIcon = styled(ImSpinner2)`
  width: 40px;
  height: 40px;
  color: ${COLOR.LIGHT_GREEN};
  animation-name: ${spinAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;
