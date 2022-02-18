import { useEffect } from 'react';

const useBlockBack = (
  callback: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
) => {
  useEffect(() => {
    window.onpopstate = () => callback();
    return () => {
      window.onpopstate = null;
    };
  }, [callback]);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    return () => {
      window.history.back();
    };
  }, []);
};

export default useBlockBack;
