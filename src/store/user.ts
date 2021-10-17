import jwt_decode, { JwtPayload } from 'jwt-decode';
import { atom, selector } from 'recoil';
import Cookies from 'universal-cookie';

import { mini } from '../App';
import { getCodefromUrl } from '../util/utils';

type TokenPayloadType =
  | ({
      code: string;
      nickname: string;
      region: string;
    } & JwtPayload)
  | undefined;

type UserInfoType =
  | {
      nickname: string;
      region: string;
    }
  | undefined;

export const userInfoAtom = atom<UserInfoType>({
  key: 'UserInfoAtom',
  default: undefined,
});

export const codeSelector = selector({
  key: 'Code',
  get: async () => {
    const code = getCodefromUrl(location.search);
    const jwtToken = new Cookies().get('Authorization');
    const decodedJwt: TokenPayloadType = jwtToken
      ? jwt_decode(jwtToken)
      : undefined;

    const genCodeWithPreset = (): Promise<string> =>
      new Promise((resolve, reject) => {
        mini.startPreset({
          preset: process.env.MINI_PRESET_URL || '',
          params: {
            appId: process.env.APP_ID || '',
          },
          onSuccess(result) {
            if (result && result.code) resolve(result.code);
          },
          onFailure() {
            reject('');
          },
        });
      });

    // URL에 코드가 있으면서 Token code와 일치하는 경우
    if (code && decodedJwt && code === decodedJwt.code) return code;

    // URL에 코드가 없거나, Token code와 일치하지 않는 경우
    const newCode = await genCodeWithPreset();
    return newCode;
  },
});
