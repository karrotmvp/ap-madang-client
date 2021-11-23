import { MeetingList, MeetingDetail } from 'meeting';

import customAxios from '../util/request';

export const getMeetings = async (region_id: string) => {
  try {
    const result: getMeetingsRes = await customAxios().get(
      `/meetings?region_id=${region_id}`,
    );
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

export const increaseMeetingEnterUserCount = async (
  id: string,
): Promise<increaseMeetingEnterUserCountRes> => {
  try {
    await customAxios().post(`/meetings/${id}/enter`);
    return { success: true };
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

interface increaseMeetingEnterUserCountRes {
  success: boolean;
}
