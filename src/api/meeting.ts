import { meetingType } from '../store/meeting';
import customAxios from '../util/request';

export const getMeetings = async () => {
  try {
    const result: getMeetingsRes = await customAxios().post('/meetings');
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const getMeetingDetail = async (
  id: string,
): Promise<getMeetingDetailRes> => {
  try {
    const result = await customAxios().post(`/meetings/${id}`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface getMeetingsRes {
  success: boolean;
  data?: meetingType[];
}

interface getMeetingDetailRes {
  success: boolean;
  data?: MeetingDetailType;
}

interface MeetingDetailDescriptionType {
  text?: string;
  recommend_user: { text: string }[];
  recommend_topic: { text: string }[];
}

export interface MeetingDetailType {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  live_status: 'live' | 'finish' | 'upcoming';
  alarm_id: number | undefined;
  description: MeetingDetailDescriptionType;
  meeting_url: string;
  region: string;
  image: string;
}
