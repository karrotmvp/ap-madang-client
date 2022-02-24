import React, { useEffect } from 'react';

import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

import { useToastDispatch } from '../util/toastContext';

type props = {
  id: string;
  msg: string;
  delay: number;
};

function Toast({ id, delay = 2000, msg }: props) {
  const toastRef = React.useRef<HTMLDivElement>(null);
  const toastDispatch = useToastDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      toastDispatch({ type: 'REMOVE', id });
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, id, toastDispatch]);

  useEffect(() => {
    if (toastRef.current) {
      toastDispatch({
        type: 'UPDATE_HEIGHT',
        id,
        height: toastRef.current.offsetHeight,
      });
    }
  }, [id, toastDispatch]);

  return (
    <Wrapper ref={toastRef}>
      <ToastWrapper delay={delay}>{msg}</ToastWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  width: 100%;
  padding: 0 0.8rem;
  box-sizing: border-box;
`;

export const toastAnimation = keyframes`
  0%{
    transform: translate(0, 0);
    opacity: 0;
  }
  20%{
    transform: translate(0, calc(-100% - 8px));
    opacity: 1;
  }
  90%{
    transform:translate(0, calc(-100% - 8px));
    opacity: 1;
  }
`;

const ToastWrapper = styled.div<{ delay: number }>`
  padding: 1.4rem 1.6rem;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;
  color: #ffffff;

  word-break: break-all;
  box-sizing: border-box;

  background: ${({ theme }) => theme.colors.$gray900};
  opacity: 0.95;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.28);

  border-radius: 0.4rem;
  color: white;

  z-index: 10;
  animation-duration: ${({ delay }) => delay}ms;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-name: ${toastAnimation};
  pointer-events: none;
`;

export default Toast;
