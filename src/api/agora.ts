import landongmoAxios from '../util/request';

export const validateMeetingCode = async (
  code: string,
): Promise<validAgoraCodeRes> => {
  try {
    const result = await landongmoAxios().get(
      `/agora/validate-code?code=${code}`,
    );
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const getAgoraCode = async (id: string): Promise<getAgoraCodeRes> => {
  try {
    const result = await landongmoAxios().get(`/agora/code?meeting=${id}`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export type InfoType = {
  meeting: {
    id: number;
    title: string;
    channel_name: string;
    sub_topics: string[];
    start_time: string;
    end_time: string;
    date: string;
    description: {
      text: string;
      recommend_user: { text: string }[];
      recommend_topic: { text: string }[];
    };
    host: {
      id: number;
      nickname: string;
      profile_image_url: string;
      manner_temperature: number;
      region_name: string;
    };
  };
  user: {
    id: number;
    nickname: string;
    profile_image_url: string;
    manner_temperature: number;
    region_name: string;
  };
  agora_token: string;
  token: string;
};

interface validAgoraCodeRes {
  success: boolean;
  data?: InfoType;
}

interface getAgoraCodeRes {
  success: boolean;
  data?: { code: string };
}
