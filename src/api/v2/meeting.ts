import { MeetingList } from 'meeting-v2';

import landongmoAxios from '../../util/request';

export const getMeetings = async (region_id: string) => {
  try {
    const result: getMeetingsRes = await landongmoAxios().get(
      `/meetings/?region_id=${region_id}/`,
    );
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const closeMeeting = async (meetingId: string) => {
  try {
    await landongmoAxios().get(`/meetings${meetingId}/close/`);
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

interface getMeetingsRes {
  success: boolean;
  data?: MeetingList[];
}
