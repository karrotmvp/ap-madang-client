import customAxios from '../util/request';

export const getAgoraCode = async (id: string): Promise<getAgoraCodeRes> => {
  try {
    const result = await customAxios().get(`/agora/code?meeting=${id}`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface getAgoraCodeRes {
  success: boolean;
  data?: { code: string };
}
