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
      console.log('1');
      ejectApp();
    } catch (e) {
      console.log('1 catch,', e);
      try {
        console.log('2');
        daangnBridge.router.close();
      } catch (e) {
        console.log('2 catch', e);
        window.close();
      }
    }
  }, [ejectApp]);

  const fetchKarrotScheme = useCallback(async () => {
    const result = await getMeetingKarrotScheme(share_code);
    if (result.success && result.data) {
      setUrl(result.data.karrot_scheme_url);
      closeWindow();
      setTimeout(() => {
        if (result.data) window.location.href = result.data.karrot_scheme_url;
      }, 1000);
    }
  }, [closeWindow, share_code]);

  useEffect(() => {
    if (share_code) fetchKarrotScheme();
  }, [share_code, fetchKarrotScheme]);

  // visibilityState hidden 인경우 mini app 종료
  const onVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      console.log('visibilityState hidden event');
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
