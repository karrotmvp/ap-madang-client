/** @jsxImportSource @emotion/react */
import * as React from 'react';

import { css, keyframes } from '@emotion/react';

import heart_emoji from '../../../assets/icon/agora/heart_emoji.svg';

interface ClickAnimationProps {
  id: string;
  posX: number;
  posY: number;
  size: number;
  onDestroy: (id: string) => void;
}

const ClickAnimation: React.FC<ClickAnimationProps> = ({
  id,
  posX,
  posY,
  size,
  onDestroy,
}) => {
  React.useEffect(() => {
    setTimeout(() => {
      onDestroy(id);
    }, 1500);
  }, [id, onDestroy]);

  return (
    <img
      css={karrotImageStyle}
      src={heart_emoji}
      style={{
        left: `${posX}px`,
        top: `${posY}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      alt=""
    />
  );
};

export default React.memo(ClickAnimation);

const animation = keyframes`
  100% {
    transform: translateY(-500%) scale(4);
    
    opacity: 0;
  }
`;

const karrotImageStyle = css`
  position: absolute;
  z-index: 10;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-name: ${animation};
  animation-fill-mode: forwards;
  pointer-events: none;
`;
