import { MeetingList, MeetingDetail } from 'meeting';

import landongmoAxios from '../util/request';

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

export const getMyMeetings = async () => {
  try {
    const result: getMeetingsRes = await landongmoAxios().get(
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
    const result = await landongmoAxios().get(`/meetings/${id}/`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const increaseMeetingEnterUserCount = async (
  id: string,
): Promise<increaseMeetingEnterUserCountRes> => {
  try {
    await landongmoAxios().post(`/meetings/${id}/enter`);
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

export const createMeeting = async (
  createData: createFormType,
): Promise<createMeetingRes> => {
  try {
    const res: { data: { id: number } } = await landongmoAxios().post(
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
    await landongmoAxios().delete(`/meetings/${id}/`);
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

export const shareMeeting = async (id: string): Promise<shareMeetingRes> => {
  try {
    const res: { data: { short_url: string } } = await landongmoAxios().get(
      `/share/short-url/meeting?meeting=${id}`,
    );
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false };
  }
};

export const generateShortLink = async (): Promise<generateShortLinkRes> => {
  try {
    const result = await landongmoAxios().post(`/meetings/link`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const getMeetingKarrotScheme = async (
  share_code: string,
): Promise<getMeetingKarrotSchemeRes> => {
  try {
    const result = await landongmoAxios().get(
      `/share/karrot-scheme-url?share_code=${share_code}`,
    );
    return { success: true, data: result.data };
  } catch (e) {
    console.log(e);
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

interface shareMeetingRes {
  success: boolean;
  data?: { short_url: string };
}

interface generateShortLinkRes {
  success: boolean;
  data?: {
    share_code: string;
  };
}

interface getMeetingKarrotSchemeRes {
  success: boolean;
  data?: {
    karrot_scheme_url: string;
  };
}
