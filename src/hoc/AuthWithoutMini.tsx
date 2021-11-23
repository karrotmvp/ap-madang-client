import React, { useCallback, useEffect } from 'react';

import { logEvent } from '@firebase/analytics';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useRecoilState } from 'recoil';

import { login } from '../api/user';
import { analytics } from '../App';
import { codeAtom, userInfoAtom } from '../store/user';
import { getRegionId } from '../util/utils';

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
} & JwtPayload;

const AuthWithoutMini = (SpecialComponent: React.FC) => {
  const AuthenticateCheck = (
    props: JSX.IntrinsicAttributes & {
      children?: React.ReactNode;
    },
  ) => {
    const [code, setCode] = useRecoilState(codeAtom);
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
    const storage = window.localStorage;

    // userInfo Atom에 유저정보 store
    const setUserNewInfoHandler = useCallback(async () => {
      const regionId = getRegionId(location.search);
      const regionIdHash = getRegionId(location.hash);
      if (!userInfo && code && (regionId || regionIdHash)) {
        const result = await login({
          code,
          regionId: regionId || regionIdHash,
        });
        if (result.success && result.data?.token) {
          storage.setItem('Authorization', result.data.token);
          const decodeToken: TokenPayloadType = jwt_decode(result.data.token);
          setUserInfo({
            nickname: decodeToken.nickname,
            region: decodeToken.region,
          });
        }
      }
    }, [code, setUserInfo, storage, userInfo]);

    // url code param 가져오기 or mini로 code gererate
    const getCodeHandler = useCallback(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const codeParams = urlSearchParams.get('code');
      if (codeParams && !code) setCode(codeParams);
    }, [code, setCode]);

    // 이미 jwt가 있는 경우 해당 jwt 발급 code가 현재 코드와 일치하는지 확인
    const checkAuth = useCallback(() => {
      const jwtToken = localStorage.getItem('Authorization');
      if (jwtToken) {
        const decodeToken: TokenPayloadType = jwt_decode(jwtToken);
        if (decodeToken.code === code) {
          setUserInfo({
            nickname: decodeToken.nickname,
            region: decodeToken.region,
          });
          return;
        }
      }
      setUserNewInfoHandler();
    }, [code, setUserInfo, setUserNewInfoHandler]);

    useEffect(() => {
      if (!code) {
        logEvent(analytics, 'new_user_enter');
        getCodeHandler();
      }
      if (code && !userInfo) checkAuth();
    }, [checkAuth, code, getCodeHandler, userInfo]);

    return <SpecialComponent {...props} />;
  };

  return AuthenticateCheck;
};

export default AuthWithoutMini;
