import { logEvent } from '@firebase/analytics';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { SetterOrUpdater } from 'recoil';

import { login } from '../api/user';
import { analytics } from '../App';
import { UserInfoType } from '../store/user';
import mini from './mini';
import { getRegionId } from './utils';

type TokenPayloadType = {
  code: string;
  nickname: string;
  region: string;
} & JwtPayload;

type Props = {
  setCode: SetterOrUpdater<string | undefined>;
  setUserInfo: SetterOrUpdater<UserInfoType>;
  eventName: string;
};

type setUserNewInfoHandlerType = {
  code: string;
  setUserInfo: SetterOrUpdater<UserInfoType>;
};

type checkAuthType = {
  code: string;
  setCode: SetterOrUpdater<string | undefined>;
  setUserInfo: SetterOrUpdater<UserInfoType>;
};

// userInfo Atom에 유저정보 store
const setUserNewInfoHandler = async ({
  code,
  setUserInfo,
}: setUserNewInfoHandlerType) => {
  const regionId = getRegionId(location.search);
  if (code && regionId) {
    const result = await login({
      code,
      regionId: regionId,
    });
    if (result.success && result.data?.token) {
      localStorage.setItem('Authorization', result.data.token);
      const decodeToken: TokenPayloadType = jwt_decode(result.data.token);
      setUserInfo({
        nickname: decodeToken.nickname,
        region: decodeToken.region,
      });
      return {
        nickname: decodeToken.nickname,
        region: decodeToken.region,
      };
    }
  }
  return undefined;
};

// url code param 가져오기 or mini로 code gererate
const getCodeHandler = (eventName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    mini.startPreset({
      preset: process.env.MINI_PRESET_URL || '',
      params: { appId: process.env.APP_ID || '' },
      onSuccess(result: { code: string }) {
        if (result && result.code) {
          logEvent(analytics, 'guest_success_preset__show', {
            event_name: eventName,
          });
          resolve(result.code);
        }
        reject('');
      },
      onClose() {
        reject('');
      },
    });
  });
};

// 이미 jwt가 있는 경우 해당 jwt 발급 code가 현재 코드와 일치하는지 확인
const checkAuth = ({ code, setCode, setUserInfo }: checkAuthType) => {
  const jwtToken = localStorage.getItem('Authorization');
  if (jwtToken) {
    const decodeToken: TokenPayloadType = jwt_decode(jwtToken);
    if (decodeToken.code === code) {
      setUserInfo({
        nickname: decodeToken.nickname,
        region: decodeToken.region,
      });
      setCode(code);
      return {
        nickname: decodeToken.nickname,
        region: decodeToken.region,
      };
    }
  }
  return setUserNewInfoHandler({ code, setUserInfo });
};

export const withMini = async ({ setCode, setUserInfo, eventName }: Props) => {
  const newCode = await getCodeHandler(eventName);
  if (newCode) return checkAuth({ code: newCode, setCode, setUserInfo });
  return undefined;
};

// 유저 인증 알림 핸들러
export const authHandler =
  (
    callback: (userInfo: UserInfoType) => (e?: React.MouseEvent) => void,
    setCode: SetterOrUpdater<string | undefined>,
    setUserInfo: SetterOrUpdater<UserInfoType>,
    eventName: string,
  ) =>
  async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    logEvent(analytics, 'guest_open_preset__show', { event_name: eventName });
    const result = await withMini({ setCode, setUserInfo, eventName });
    if (!result) return;
    else {
      await callback(result)(e);
    }
  };

export default withMini;
