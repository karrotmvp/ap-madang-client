import React, { useEffect, useState, useCallback } from 'react';

import jwt_decode, { JwtPayload } from 'jwt-decode';
// import { useHistory } from 'react-router';
// import { useNavigator } from '@karrotframe/navigator';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

// import { login } from '../api/user';
// import { mini } from '../App';
import { login } from '../api/user';
import { codeSelector, userInfoAtom } from '../store/user';
import { getRegionId } from '../util/utils';
// import { userInfoAtom } from '../store/user';
// import { getCodefromUrl, getRegionId } from '../util/utils';

type Props = {
  Component: React.FC;
  option?: boolean;
  //   adminRoute?: boolean;
};

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
} & JwtPayload;

// type decodeTokenType = JwtPayload & TokenPayloadType

export default function Auth({ Component, option }: Props) {
  const AuthenticateCheck = (
    props: JSX.IntrinsicAttributes & {
      children?: React.ReactNode;
    },
  ) => {
    const cookie = new Cookies();
    const [loading, setLoading] = useState(true);
    const code = useRecoilValue(codeSelector);
    const jwtToken = cookie.get('Authorization');

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
      [setUserInfo],
    );

    useEffect(() => {
      console.log('Auth UseEffect - auth', option);

      if (jwtToken) {
        const decodedJwt: TokenPayloadType = jwt_decode(jwtToken);
        if (decodedJwt.code === code) {
          setLoading(false);
          setUserInfo({
            nickname: decodedJwt.nickname,
            region: decodedJwt.region,
          });
          return;
        }
        /* TODO: Else => new Token 요청 및 유저 인포 set */
      }

      userInfoHandler(code);
      setLoading(false);
    }, [code, jwtToken, setUserInfo, userInfoHandler]);

    return !loading ? <Component {...props} /> : <div>Auth 로딩 중</div>;
  };

  return AuthenticateCheck;
}
