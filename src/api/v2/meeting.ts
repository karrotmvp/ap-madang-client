import { MeetingList } from 'meeting-v2';

import customAxios from '../../util/request';

export const getMeetings = async (region_id: string) => {
  try {
    const result: getMeetingsRes = await customAxios().get(
      `/meetings/?region_id=${region_id}/`,
    );
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface getMeetingsRes {
  success: boolean;
  data?: MeetingList[];
}
