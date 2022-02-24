export enum Events {
  SHOW = 'show',
  HIDE = 'hide',
  HIDE_ALL = 'hideAll',
  UPDATE_HEIGHT = 'updateHeight',
}

export type Type = 'default';

export type ToastContent = string;

export interface Toast {
  id: string;
  content: ToastContent;
  type: Type;
  height: number;
}

export interface ToastProvider {
  content: ToastContent;
}
