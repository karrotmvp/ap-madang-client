import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { login } from '../api/user';
import { userInfoAtom } from '../store/user';
import mini from '../util/mini';

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
} & JwtPayload;
export const useMini = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  // update user info
  const updateUserInfo = async (token: string) => {
    window.localStorage.setItem('Authorization', token);
    const decodeToken: TokenPayloadType = jwt_decode(token);
    setUserInfo({
      nickname: decodeToken.nickname,
      region: decodeToken.region,
    });
  };

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
    [],
  );

  // with Third-party agreement handler
  const loginWithMini = useCallback(async (runOnSuccess?: () => void) => {
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
  }, []);

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
        });
        return;
      }
    }
    fetchLoginUser(code);
  }, []);

  // Leave miniapp
  const ejectApp = () => {
    mini.close();
  };

  return {
    loginWithoutMini,
    loginWithMini,
    ejectApp,
  };
};
