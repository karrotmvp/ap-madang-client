import { meetingType } from '../store/meeting';
import customAxios from '../util/request';

export const getMeetings = async () => {
  try {
    const result: getMeetingsRes = await customAxios.post('/meetings');
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface getMeetingsRes {
  success: boolean;
  data?: meetingType[];
}
