import customAxios from '../util/request';

export const login = async ({ code, regionId }: loginReq) => {
  try {
    const result: loginRes = await customAxios().post('/users/login', {
      code,
      region_id: regionId,
    });
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

export const getMeetingUsersInfo = async (users: number): Promise<usersRes> => {
  try {
    const result = await customAxios().get(`/users/${users}`);
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface loginReq {
  code: string;
  regionId: string;
}

interface loginRes {
  success: boolean;
  data?: { token: string; nickname: string; region: string };
}

interface usersRes {
  success: boolean;
  data?: {
    id: number;
    nickname: string;
    profile_image_url: string;
    manner_temperature: number;
    region_name: string;
  };
}
