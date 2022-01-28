import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/css';

import { getMeetingKarrotScheme } from '../../api/meeting';
import useMini from '../../hook/useMini';
import { daangnBridge } from '../../util/daangnBridge';
import { getParams } from '../../util/utils';

function ShortURLPage() {
  const [url, setUrl] = useState('');
  const { ejectApp } = useMini();

  const share_code = useMemo(() => {
    return getParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'share_code',
    ).split('&')[0];
  }, []);

  const closeWindow = useCallback(() => {
    daangnBridge.router.close();
    window.close();
    ejectApp();
  }, [ejectApp]);

  const fetchKarrotScheme = useCallback(async () => {
    const result = await getMeetingKarrotScheme(share_code);
    if (result.success && result.data) {
      setUrl(result.data.karrot_scheme_url);
      window.location.href = result.data.karrot_scheme_url;
      closeWindow();
    }
  }, [closeWindow, share_code]);

  useEffect(() => {
    if (share_code) fetchKarrotScheme();
  }, [share_code, fetchKarrotScheme]);

  // visibilityState hidden 인경우 mini app 종료
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      closeWindow();
    }
  }, [closeWindow]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [onVisibilityChange]);

  return (
    <div>
      {share_code}
      <br />
      <button
        className={ButtonStyle}
        type="button"
        onClick={() => {
          window.open(url);
        }}
      >
        Move to Daangn///{url}
      </button>
      <br />
    </div>
  );
}

const ButtonStyle = css`
  font-size: 20px;
`;

export default ShortURLPage;
