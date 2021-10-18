import React, { useEffect, useCallback } from 'react';

import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import { login } from '../api/user';
import { codeSelector, userInfoAtom } from '../store/user';
import { getRegionId } from '../util/utils';

type Props = {
  Component: React.FC;
  option?: boolean;
};

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
} & JwtPayload;

export default function Auth({ Component, option }: Props) {
  const AuthenticateCheck = (
    props: JSX.IntrinsicAttributes & {
      children?: React.ReactNode;
    },
  ) => {
    const cookie = new Cookies();

    const jwtToken = cookie.get('Authorization');
    const code = useRecoilValue(codeSelector);

    const setUserInfo = useSetRecoilState(userInfoAtom);

    const userInfoHandler = useCallback(
      async code => {
        const regionId = getRegionId(location.search);
        if (code && regionId) {
          const result = await login({ code, regionId });
          if (!result.success) return;
          if (result.data?.token) {
            cookie.set('Authorization', result.data.token);
            const decodeToken: TokenPayloadType = jwt_decode(result.data.token);
            setUserInfo({
              nickname: decodeToken.nickname,
              region: decodeToken.region,
            });
          }
        }
      },
      // eslint-disable-next-line
      [],
    );

    useEffect(() => {
      console.log('Auth UseEffect - auth', option);
      if (jwtToken) {
        const decodedJwt: TokenPayloadType = jwt_decode(jwtToken);
        if (decodedJwt.code === code) {
          setUserInfo({
            nickname: decodedJwt.nickname,
            region: decodedJwt.region,
          });
          return;
        }
      }
      userInfoHandler(code);
      // eslint-disable-next-line
    }, [jwtToken, setUserInfo, userInfoHandler]);

    return <Component {...props} />;
  };

  return AuthenticateCheck;
}
