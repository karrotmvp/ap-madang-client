import { MeetingList, MeetingDetail } from 'meeting';

import customAxios from '../util/request';

export const getMeetings = async () => {
  try {
    const result: getMeetingsRes = await customAxios().get('/meetings/');
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const getMeetingDetail = async (
  id: string,
): Promise<getMeetingDetailRes> => {
  try {
    const result = await customAxios().get(`/meetings/${id}/`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface getMeetingsRes {
  success: boolean;
  data?: MeetingList[];
}

interface getMeetingDetailRes {
  success: boolean;
  data?: MeetingDetail;
}
