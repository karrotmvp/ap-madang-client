import { atom, selector } from 'recoil';

import { getCodefromUrl } from '../util/utils';

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
    const genCodeWithPreset = (): Promise<string> =>
      new Promise((resolve, reject) => {
        console.log('gen code');
        mini.startPreset({
          preset: process.env.MINI_PRESET_URL || '',
          params: {
            appId: process.env.APP_ID || '',
          },
          onSuccess: function (result) {
            if (result && result.code) {
              resolve(result.code);
            }
            reject('');
          },
        });
      });

    if (code) return code;
    const newCode = await genCodeWithPreset();
    return newCode;
  },
});
