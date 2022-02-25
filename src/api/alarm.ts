import landongmoAxios from '../util/request';

export const newAlarm = async (id: string): Promise<newAlarmRes> => {
  try {
    const result: newAlarmResultType = await landongmoAxios().post(
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
    await landongmoAxios().delete(`/alarms/meetings/${id}/`);
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
