import React, { useCallback, useEffect, useMemo } from 'react';

import { getMeetingKarrotScheme } from '../../api/meeting';
import mini from '../../util/mini';
import { getParams } from '../../util/utils';

function ShortURLPage() {
  const share_code = useMemo(() => {
    return getParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'share_code',
    ).split('&')[0];
  }, []);

  const sharedRef = useMemo(() => {
    return getParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'shared',
    ).split('&')[0];
  }, []);

  const closeWindow = useCallback(() => {
    try {
      if (sharedRef) mini.close();
      mini.close();
    } catch (_) {
      console.log('closeWinodw err');
    }
  }, [sharedRef]);

  const fetchKarrotScheme = useCallback(async () => {
    const result = await getMeetingKarrotScheme(share_code);
    if (result.success && result.data) {
      window.location.href = result.data.karrot_scheme_url;
      setTimeout(() => closeWindow(), 300);
    }
  }, [closeWindow, share_code]);

  useEffect(() => {
    if (share_code) fetchKarrotScheme();
  }, [share_code, fetchKarrotScheme]);

  // visibilityState hidden 인경우 mini app 종료
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') closeWindow();
  }, [closeWindow]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [onVisibilityChange]);

  return <div />;
}

export default ShortURLPage;
