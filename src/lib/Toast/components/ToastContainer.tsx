import React, { useReducer } from 'react';

import styled from '@emotion/styled';

import { Events } from '../types';
import {
  reducer,
  ToastContext,
  ToastDispatchContext,
} from '../util/toastContext';
import Toast from './Toast';

type hnadlerType = {
  type: Events;
  handler: (args: any) => void;
};

type Props = {
  delay?: number;
  handler?: hnadlerType;
  children: React.ReactNode;
};

function ToastContainer({ delay = 2000, children }: Props) {
  const [toastState, toastDispatch] = useReducer(reducer, { toasts: [] });

  return (
    <ToastContext.Provider value={toastState}>
      <ToastDispatchContext.Provider value={toastDispatch}>
        <Wrapper>
          {toastState.toasts?.map(toast => (
            <Toast
              key={toast.id}
              id={toast.id}
              msg={toast.content}
              delay={delay}
            />
          ))}
        </Wrapper>
        {children}
      </ToastDispatchContext.Provider>
    </ToastContext.Provider>
  );
}

const Wrapper = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 100%;
  left: 0;
  width: 100%;
  height: 0;
  z-index: 1000;
`;

export default ToastContainer;
