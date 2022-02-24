import { toaster } from '.';
import { useToastDispatch, useToastState } from './toastContext';

export function useToast() {
  const toastState = useToastState();
  const toastDispatch = useToastDispatch();

  const openToast = ({ content }: { content: string }) => {
    toastDispatch({
      type: 'ADD',
      toast: toaster({ content, type: 'default' }),
    });
  };

  const closeToast = ({ id }: { id: string }) => {
    toastDispatch({
      type: 'REMOVE',
      id,
    });
  };

  const removeAll = () => {
    toastDispatch({
      type: 'REMOVE_ALL',
    });
  };

  return { toastState, openToast, closeToast, removeAll };
}
