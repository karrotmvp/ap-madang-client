import { useEffect, useState } from 'react';

export type EventMap<T> = T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : { [key: string]: Event };

export const canUseDOM = typeof window !== 'undefined';

export function managedEventListener<
  T extends EventTarget,
  K extends keyof EventMap<T> & string,
>(
  target: T,
  type: K,
  callback: (event: EventMap<T>[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  target.addEventListener(type, callback as EventListener, options);
  return (): void => {
    target.removeEventListener(type, callback as EventListener, options);
  };
}

export default function useViewportSize(): Readonly<[number, number]> {
  const [size, setSize] = useState<Readonly<[number, number]>>(
    canUseDOM
      ? [window.visualViewport.width, window.visualViewport.height]
      : [0, 0],
  );

  useEffect(
    () =>
      managedEventListener(window.visualViewport, 'resize', () => {
        setSize([window.visualViewport.width, window.visualViewport.height]);
      }),
    [],
  );

  return size;
}
