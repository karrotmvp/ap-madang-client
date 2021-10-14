import { atom } from 'recoil';

export const userInfoAtom = atom({
  key: 'UserInfoAtom',
  default: { nickname: '', region: '' },
});
