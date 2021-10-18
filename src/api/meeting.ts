// import Cookies from 'universal-cookie';
import Cookies from 'universal-cookie';

import { meetingType } from '../store/meeting';
import customAxios from '../util/request';

export const getMeetings = async () => {
  try {
    const result: getMeetingsRes = await customAxios.post(
      '/meetings',
      {},
      { headers: { Authorization: new Cookies().get('Authorization') } },
    );
    return { success: true, data: result.data };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

interface getMeetingsRes {
  success: boolean;
  data?: meetingType[];
}
