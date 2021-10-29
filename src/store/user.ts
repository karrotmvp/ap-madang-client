import { atom } from 'recoil';

export type UserInfoType =
  | {
      nickname: string | undefined;
      region: string | undefined;
    }
  | undefined;

export const userInfoAtom = atom<UserInfoType>({
  key: 'UserInfoAtom',
  default: undefined,
});

export const codeAtom = atom<string | undefined>({
  key: 'codeAtom',
  default: undefined,
});
