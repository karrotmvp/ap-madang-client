import React from 'react';

import SpinnerIconComponents from '@assets/icon/common/Spinner';
import { keyframes } from '@emotion/css';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

function SpinnerIcon() {
  const theme = useTheme();

  return <Icon mainColor={theme.colors.$carrot400} />;
}

const spinAnimation = keyframes` 
    0% {
        transform:rotate(0);
    }
    100% {
        transform:rotate(360deg);
    }
`;

const Icon = styled(SpinnerIconComponents)`
  animation-name: ${spinAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

export default SpinnerIcon;
