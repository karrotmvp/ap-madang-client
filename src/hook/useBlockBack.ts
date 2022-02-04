import { useEffect } from 'react';

import { useHistory } from 'react-router';

const useBlockBack = (
  callback: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
) => {
  const history = useHistory();

  useEffect(() => {
    window.onpopstate = () => callback();
    return () => {
      window.onpopstate = null;
    };
  }, [callback]);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
  }, []);

  useEffect(() => {
    const unblock = history.block((_, action) => {
      if (action === 'POP') {
        return false;
      }
      return undefined;
    });

    return () => unblock();
  }, [history]);
};

export default useBlockBack;
