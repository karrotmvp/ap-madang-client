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
    window.history.pushState({ block: true }, '', window.location.href);
    return () => {
      window.history?.state?.block && window.history.back();
    };
  }, []);
};

export default useBlockBack;
