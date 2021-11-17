import { INavigatorTheme } from '@karrotframe/navigator';
import { UID } from 'agora-rtc-sdk-ng';
import moment from 'moment';

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

export const getCodefromUrl = (search: string) => {
  const urlSearchParams = new URLSearchParams(search);
  return urlSearchParams.get('code');
};

export const uidToNum = (uid: UID | string | number) => {
  if (typeof uid === 'string') return parseInt(uid);
  return uid;
};

export const getRemainTime = (start_time: string, date: string) => {
  const startDate = moment(`${date} ${start_time}`, 'YYYY-MM-DD HH:mm:ss');
  const now = moment();
  const hoursDiff = moment.duration(startDate.diff(now)).hours();
  const minutesDiff = moment.duration(startDate.diff(now)).minutes();
  return hoursDiff > 0
    ? `${hoursDiff}시간 ${minutesDiff}분 `
    : `${minutesDiff}분 `;
};

export const getRemainMilliSec = (
  start_time: string,
  end_time: string,
  date: string,
) => {
  const endDate = moment(`${date} ${end_time}`, 'YYYY-MM-DD HH:mm:ss');
  const now = moment();
  if (start_time >= end_time) endDate.add(1, 'day');
  const timeDiff = moment.duration(endDate.diff(now)).asMilliseconds();
  return timeDiff;
};

const getTimeText = (hour: number, min: number) => {
  let tempTimeText = '';
  if (hour !== 0 && hour < 12) tempTimeText += `오전 ${hour}시`;
  else if (hour === 0) tempTimeText += `오전 12시`;
  else if (hour === 12) tempTimeText += `오후 ${hour}시`;
  else tempTimeText += `오후 ${hour - 12}시`;

  if (min === 0) return tempTimeText;
  else tempTimeText += ` ${min}분`;
  return tempTimeText;
};

export const getTimeForm = (
  start_time: string,
  end_time: string,
  live_status: 'live' | 'tomorrow' | 'upcoming' | 'finish',
  head_text?: boolean,
) => {
  let text = '';
  const startTimeArr = start_time.split(':');
  const endTimeArr = end_time.split(':');

  if (live_status === 'live')
    return `${getTimeText(
      parseInt(endTimeArr[0]),
      parseInt(endTimeArr[1]),
    )}에 모임이 종료돼요`;

  if (head_text && live_status === 'tomorrow') text += '내일 ';
  else if (head_text) text += '오늘 ';
  text += getTimeText(parseInt(startTimeArr[0]), parseInt(startTimeArr[1]));
  text += '~';
  text += getTimeText(parseInt(endTimeArr[0]), parseInt(endTimeArr[1]));
  return text;
};
