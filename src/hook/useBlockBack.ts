import { useEffect } from 'react';

import { useHistory } from 'react-router';

const useBlockBack = (
  callback: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
) => {
  const history = useHistory();

  useEffect(() => {
    return history.block((_, action) => {
      if (action === 'POP') {
        callback();
        return false;
      }
      return undefined;
    });
  }, [callback, history]);
};

export default useBlockBack;
