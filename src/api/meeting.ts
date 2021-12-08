import { MeetingList, MeetingDetail } from 'meeting';

import customAxios from '../util/request';

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

export const getMyMeetings = async () => {
  try {
    const result: getMeetingsRes = await customAxios().get(
      `/users/me/meetings`,
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

export const createMeeting = async (
  createData: createFormType,
): Promise<createMeetingRes> => {
  try {
    const res: { data: { id: number } } = await customAxios().post(
      `/meetings/`,
      createData,
    );
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false };
  }
};

export const deleteMeeting = async (id: string): Promise<deleteMeetingRes> => {
  try {
    await customAxios().delete(`/meetings/${id}/`);
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

interface createFormType {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  is_video: boolean;
  image_url: string | undefined;
  description: {
    text: string;
  };
}

interface createMeetingRes {
  success: boolean;
  data?: { id: number };
}

interface deleteMeetingRes {
  success: boolean;
}
