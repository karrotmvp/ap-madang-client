import { createContext, Dispatch, useContext } from 'react';

import { Toast } from '../types';

// 상태를 위한 타입
export type IState = {
  toasts: Toast[];
};

// 모든 액션들을 위한 타입

export type TAction =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_HEIGHT'; id: string; height: number }
  | { type: 'REMOVE_ALL' };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type ToastDispatch = Dispatch<TAction>;

// Context 만들기
export const ToastContext = createContext<IState | null>(null);
export const ToastDispatchContext = createContext<ToastDispatch | null>(null);

// 리듀서
export function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case 'REMOVE': {
      return {
        ...state,
        toasts: [...state.toasts.filter(toast => toast.id !== action.id)],
      };
    }
    case 'UPDATE_HEIGHT': {
      return {
        ...state,
        toasts: state.toasts.map(toast =>
          toast.id === action.id ? { ...toast, height: action.height } : toast,
        ),
      };
    }
    case 'REMOVE_ALL': {
      return {
        ...state,
        toasts: [],
      };
    }
    default:
      throw new Error();
  }
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useToastState() {
  const state = useContext(ToastContext);
  if (!state) throw new Error('Cannot find toast Provider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useToastDispatch() {
  const dispatch = useContext(ToastDispatchContext);
  if (!dispatch) throw new Error('Cannot find toast Provider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
