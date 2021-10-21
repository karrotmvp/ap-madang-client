import { atom } from 'recoil';

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
