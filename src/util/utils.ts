import { INavigatorTheme } from '@karrotframe/navigator';
import { UID } from 'agora-rtc-sdk-ng';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

export const getQueryString = (query: string, params: string): string => {
  const urlSearchParams = new URLSearchParams(query);
  return urlSearchParams.get(params)?.split('&')[0] || '';
};

export const uidToNum = (uid: UID | string | number) => {
  if (typeof uid === 'string') return parseInt(uid);
  return uid;
};

export const getRemainMilliSec = (
  start_time: string,
  end_time: string,
  date: string,
) => {
  let endDate = dayjs(`${date} ${end_time}`, 'YYYY-MM-DD HH:mm:ss');
  const now = dayjs();
  if (start_time >= end_time) endDate = endDate.add(1, 'day');
  const timeDiff = dayjs.duration(endDate.diff(now)).asMilliseconds();
  return timeDiff;
};
