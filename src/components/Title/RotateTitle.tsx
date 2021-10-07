import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { COLOR } from '../../constant/color';

const RotateTitle = ({ intervalTime = 1500, items }: Props) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(idx => (idx + 1 < items.length ? idx + 1 : 0));
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return <RotateItem intervalTime={intervalTime}>{items[idx]}</RotateItem>;
};

export default RotateTitle;

interface Props {
  intervalTime?: number;
  items: string[];
}

type RotateItemProps = {
  intervalTime: number;
};

const titleAnimation = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  }
  20% {
    transform: translateY(0);
    opacity: 1;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  80% {
    transform: translateY(0);
    opacity: 1;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
  }
`;

const RotateItem = styled('div')`
  font-weight: 800;
  font-size: 4.8rem;
  line-height: 5.76rem;
  letter-spacing: -0.08rem;
  padding: 0.7rem 0;
  color: ${COLOR.LIGHT_GREEN};
  animation-name: ${titleAnimation};
  animation-timing-function: ease;
  animation-duration: ${(props: RotateItemProps) => props.intervalTime + 'ms'};
  animation-iteration-count: infinite;
`;
