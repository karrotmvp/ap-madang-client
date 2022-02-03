import React from 'react';

import { keyframes, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const ANIMATION_DURATION = 700;

interface Props {
  color?: string;
  size?: number;
}
const CircularProgress = ({ color, size = 24 }: Props) => {
  const theme = useTheme();

  return (
    <Base size={size}>
      <Wrapper>
        <Circles>
          <Circle size={size}>
            <CircleInner color={color ?? theme.colors.$gray500} size={size} />
          </Circle>
          <Circle2 size={size}>
            <CircleInner color={color ?? theme.colors.$gray500} size={size} />
          </Circle2>
        </Circles>
      </Wrapper>
    </Base>
  );
};

const AnimSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimCircle1 = keyframes`
  from {
    transform: rotate(60deg);
  }
  to {
    transform: rotate(205deg);
  }
`;

const AnimCircle2 = keyframes`
  from {
    transform: rotate(30deg);
  }
  to {
    transform: rotate(-115deg);
  }
`;

const Base = styled.div<{ size: number }>`
  position: relative;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  left: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
`;

const Circles = styled.div`
  animation-duration: ${ANIMATION_DURATION}ms;
  animation-iteration-count: infinite;
  animation-name: ${AnimSpinner};
  animation-timing-function: linear;
  * {
    box-sizing: border-box;
  }
`;

const Circle = styled.div<{ size: number }>`
  height: ${({ size }) => size / 2}px;
  overflow: hidden;
  width: ${({ size }) => size}px;
`;

const CircleInner = styled.div<{ size: number; color: string }>`
  animation-direction: alternate;
  animation-duration: ${ANIMATION_DURATION}ms;
  animation-iteration-count: infinite;
  animation-name: ${AnimCircle1};
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.5, 1);
  border: ${({ size, color }) => `${size / 10}px solid ${color}`};
  border-bottom: ${({ size }) => `${size / 10}px solid transparent`};
  border-radius: 50%;
  border-right: ${({ size }) => `${size / 10}px solid transparent`};
  height: 200%;
  transform: rotate(45deg);
  width: 100%;
`;

const Circle2 = styled(Circle)`
  transform: rotate(180deg);
  > div {
    animation-name: ${AnimCircle2};
  }
`;

export default React.memo(CircularProgress);
