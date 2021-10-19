import customAxios from '../util/request';

export const newAlarm = async (id: string): Promise<newAlarmRes> => {
  try {
    const result: newAlarmResultType = await customAxios().post(
      `/alarms/meetings/`,
      { meeting: id },
    );
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const deleteAlarm = async (id: string): Promise<deleteAlarmRes> => {
  try {
    await customAxios().delete(`/alarms/meetings/${id}/`);
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

interface newAlarmRes {
  success: boolean;
  data?: {
    id: number;
    meeting: number;
    user: number;
    created_at: Date;
  };
}

interface newAlarmResultType {
  data: { id: number; meeting: number; user: number; created_at: Date };
}

interface deleteAlarmRes {
  success: boolean;
}

interface MeetingDetailDescriptionType {
  text?: string;
  recommend_user: { text: string }[];
  recommend_topic: { text: string }[];
}

export interface DeleteAlarmType {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  is_live: boolean;
  alarm_id: number;
  description: MeetingDetailDescriptionType;
  meeting_url: string;
  region: string;
}
