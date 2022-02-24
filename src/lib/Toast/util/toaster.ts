import { Type, ToastProvider, Toast } from '../types';

export interface Toaster extends ToastProvider {
  type: Type;
}

export const toaster = ({ content, type }: Toaster): Toast => {
  return {
    id: Math.random().toString(36).substr(2, 10),
    content,
    type,
    height: 0,
  };
};
