import { useCallback } from 'react';

import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useRecoilState } from 'recoil';

import { login } from '../api/user';
import { userInfoAtom } from '../store/user';
import mini from '../util/mini';

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
  profile_image_url: string;
} & JwtPayload;

const useMini = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  // update user info
  const updateUserInfo = useCallback(
    async (token: string) => {
      window.localStorage.setItem('Authorization', token);
      const decodeToken: TokenPayloadType = jwt_decode(token);
      setUserInfo({
        nickname: decodeToken.nickname,
        region: decodeToken.region,
        profile_image_url: decodeToken.profile_image_url,
      });
    },
    [setUserInfo],
  );

  // fetch login
  const fetchLoginUser = useCallback(
    async (code: string, runOnSuccess?: () => void) => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const regionId = urlSearchParams.get('region_id');
      const res = await login({
        code: code,
        regionId: regionId || '',
      });
      if (res.success && res.data?.token) {
        updateUserInfo(res.data.token);
        if (runOnSuccess !== undefined) {
          runOnSuccess();
        }
      }
    },
    [updateUserInfo],
  );

  // with Third-party agreement handler
  const loginWithMini = useCallback(
    async (runOnSuccess?: () => void) => {
      if (userInfo) {
        runOnSuccess && runOnSuccess();
        return;
      }
      mini.startPreset({
        preset: process.env.MINI_PRESET_URL || '',
        params: { appId: process.env.APP_ID || '' },
        onSuccess: async function (result) {
          if (result && result.code) {
            fetchLoginUser(result.code, runOnSuccess);
          }
        },
      });
    },
    [fetchLoginUser, userInfo],
  );

  // without Third-party agreement handler
  const loginWithoutMini = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (!code) return;

    const jwtToken = localStorage.getItem('Authorization');
    if (jwtToken) {
      const decodeToken: TokenPayloadType = jwt_decode(jwtToken);
      if (decodeToken.code === code) {
        setUserInfo({
          nickname: decodeToken.nickname,
          region: decodeToken.region,
          profile_image_url: decodeToken.profile_image_url,
        });
        return;
      }
    }
    fetchLoginUser(code);
  }, [fetchLoginUser, setUserInfo]);

  // Leave miniapp
  const ejectApp = () => {
    mini.close();
  };

  // share link
  const share = (url: string, text: string) => {
    mini.share({
      url,
      text,
    });
  };

  return {
    loginWithoutMini,
    loginWithMini,
    ejectApp,
    share,
  };
};

export default useMini;
