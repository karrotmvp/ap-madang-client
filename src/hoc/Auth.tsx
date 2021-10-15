import React, { useEffect, useCallback, useState } from 'react';

import { useHistory } from 'react-router';
// import { useNavigator } from '@karrotframe/navigator';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import { login } from '../api/user';
import { mini } from '../App';
import { authAtom } from '../store/user';
import { userInfoAtom } from '../store/user';
import { getCodefromUrl, getRegionId } from '../util/utils';

export default function Auth({
  Component,
  option,
}: // adminRoute = null,
AuthProps) {
  const AuthenticateCheck = (
    props: JSX.IntrinsicAttributes & { children?: React.ReactNode },
  ) => {
    const cookie = new Cookies();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useRecoilState(authAtom);
    const history = useHistory();
    const setUserInfo = useSetRecoilState(userInfoAtom);

    const userInfoHandler = useCallback(
      async code => {
        const regionId = getRegionId(location.search);
        if (code && regionId) {
          const result = await login({ code, regionId });
          if (!result.success) return;
          if (
            result.data?.token &&
            result.data?.nickname &&
            result.data?.region
          ) {
            cookie.set('Authorization', result.data?.token);
            setAuth(true);
            setUserInfo({
              nickname: result.data.nickname,
              region: result.data.region,
            });
          }
        }
      },
      // eslint-disable-next-line
      [setUserInfo],
    );

    const miniPresetHandler = useCallback(() => {
      console.log('mini preset start');
      mini.startPreset({
        preset: process.env.MINI_PRESET_URL || '',
        params: {
          appId: process.env.APP_ID || '',
        },
        async onSuccess(result) {
          if (result && result.code) userInfoHandler(result.code);
          return 0;
        },
      });
    }, [userInfoHandler]);

    const checkTokenVarify = useCallback(
      async () =>
        await setTimeout(() => {
          console.log('TODO: async check Token varify');
          setLoading(false);
          setAuth(false);
        }, 300),
      [setAuth],
    );

    useEffect(() => {
      console.log('Auth UseEffect - auth', option);
      if (!auth) {
        const code = getCodefromUrl(location.search);
        if (code) userInfoHandler(code);
        else miniPresetHandler();
        setLoading(false);
      } else {
        // TODO: JWT 상태 확인 request
        checkTokenVarify();
        console.log('TODO: JWT 상태 확인 요청');
      }
      // eslint-disable-next-line
    }, [checkTokenVarify, history, miniPresetHandler, userInfoHandler]);

    return !loading ? <Component {...props} /> : <div>Auth 로딩 중</div>;
  };

  return AuthenticateCheck;
}

type AuthProps = {
  Component: React.FC;
  option?: boolean;
  adminRoute?: boolean;
};
