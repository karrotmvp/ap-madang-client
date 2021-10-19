import { useCallback } from 'react';

import { useLocation } from 'react-router-dom';

import { mini } from '../App';
import { getCodefromUrl } from '../util/utils';

export function useCode(
  presetUrl: string,
  appId: string,
  setCode: (code: string) => void,
): () => void {
  const location = useLocation();

  const getCode = useCallback(() => {
    const urlCode = getCodefromUrl(location.search);
    if (urlCode) {
      setCode(urlCode);
    } else {
      mini.startPreset({
        preset: presetUrl,
        params: {
          appId,
        },
        onSuccess(result) {
          if (result && result.code) {
            setCode(result.code);
          }
        },
      });
    }
  }, [appId, location.search, presetUrl, setCode]);

  return getCode;
}
