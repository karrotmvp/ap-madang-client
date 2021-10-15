import { atom } from 'recoil';
import Cookies from 'universal-cookie';

export const userInfoAtom = atom({
  key: 'UserInfoAtom',
  default: { nickname: '', region: '' },
});

export const authAtom = atom({
  key: 'Auth',
  default: new Cookies().get('Authorization') ? true : false,
});
