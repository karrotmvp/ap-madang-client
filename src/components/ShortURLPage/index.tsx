import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/css';
import styled from '@emotion/styled';

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
    try {
      ejectApp();
    } catch (_) {
      try {
        daangnBridge.router.close();
      } catch (_) {
        window.close();
      }
    }
  }, [ejectApp]);

  const fetchKarrotScheme = useCallback(async () => {
    const result = await getMeetingKarrotScheme(share_code);
    if (result.success && result.data) {
      setUrl(result.data.karrot_scheme_url);
      closeWindow();
      window.location.href = result.data.karrot_scheme_url;
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
        Move to Daangn
      </button>
      <Span>{url}</Span>
      <br />
    </div>
  );
}

const ButtonStyle = css`
  font-size: 20px;
  color: blue;
`;

const Span = styled.span`
  color: red;
`;

export default ShortURLPage;
