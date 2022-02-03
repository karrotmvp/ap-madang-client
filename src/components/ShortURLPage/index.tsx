import React, { useCallback, useEffect, useMemo } from 'react';

import { getMeetingKarrotScheme } from '../../api/meeting';
import useMini from '../../hook/useMini';
// import { daangnBridge } from '../../util/daangnBridge';
import { getParams } from '../../util/utils';

function ShortURLPage() {
  const { ejectApp } = useMini();

  const share_code = useMemo(() => {
    return getParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'share_code',
    ).split('&')[0];
  }, []);

  const closeWindow = useCallback(() => {
    try {
      // daangnBridge.router.close();
      ejectApp();
      window.close();
    } catch (_) {
      console.log('closeWinodw err');
    }
  }, [ejectApp]);

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
