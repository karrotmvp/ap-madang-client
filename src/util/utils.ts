import { INavigatorTheme } from '@karrotframe/navigator';

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

export const getRemainTime = (start_time: string) => {
  const today = new Date();
  const currHour = today.getHours();
  const currMin = today.getMinutes();
  const startTimeArr = start_time.split(':');

  let hourDiff = parseInt(startTimeArr[0]) - currHour;
  let minDiff = parseInt(startTimeArr[1]) - currMin;

  let result = '';
  if (minDiff < 0) {
    hourDiff -= 1;
    minDiff += 60;
  }
  if (hourDiff > 0) result += `${hourDiff}시간 `;
  if (minDiff > 0) result += `${minDiff}분 `;

  return result;
};

export const getRemainFullTime = (end_time: string) => {
  const today = new Date();

  const currHour = today.getHours();
  const currMin = today.getMinutes();
  const currSec = today.getSeconds();
  const endTimeArr = end_time.split(':');

  let hourDiff = parseInt(endTimeArr[0]) - currHour;
  let minDiff = parseInt(endTimeArr[1]) - currMin;
  let secDiff = parseInt(endTimeArr[2]) - currSec;

  let result = '';
  if (secDiff < 0) {
    minDiff -= 1;
    secDiff += 60;
  }
  if (minDiff < 0) {
    hourDiff -= 1;
    minDiff += 60;
  }
  if (hourDiff > 0) result += `${hourDiff}:`;
  if (minDiff > 0) result += `${minDiff.toString().padStart(2, '0')}:`;
  if (secDiff >= 0) result += `${secDiff.toString().padStart(2, '0')} `;

  return result;
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
