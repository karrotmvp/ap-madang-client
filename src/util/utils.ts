import { INavigatorTheme } from '@karrotframe/navigator';
import { UID } from 'agora-rtc-sdk-ng';

export const checkMobileType = (): INavigatorTheme => {
  const UA = navigator.userAgent.toLowerCase(); // userAgent 값 얻기
  if (UA.indexOf('android') > -1) return 'Android';
  if (
    UA.indexOf('iphone') > -1 ||
    UA.indexOf('ipad') > -1 ||
    UA.indexOf('ipod') > -1
  )
    return 'Cupertino';
  return 'Android';
};

export const getRegionId = (search: string): string => {
  const urlSearchParams = new URLSearchParams(search);
  return urlSearchParams.get('region_id') || '';
};

export const getParams = (hash: string, params: string): string => {
  const urlSearchParams = new URLSearchParams(hash);
  return urlSearchParams.get(params) || '';
};

export const uidToNum = (uid: UID | string | number) => {
  if (typeof uid === 'string') return parseInt(uid);
  return uid;
};
