import landongmoAxios from '../util/request';

export const alarmReservation = async ({
  code,
  regionId,
  suggestion,
}: alarmReservationReq): Promise<alarmReservationRes> => {
  try {
    await landongmoAxios().post('/reservation/', {
      code,
      region_id: regionId,
      suggestion,
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

export const getRegionName = async ({
  region_id,
}: getRegionNameReq): Promise<getRegionNameRes> => {
  try {
    const result = await landongmoAxios().get<regionNameFetchRes>(
      '/reservation/region',
      {
        params: { region_id },
      },
    );
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface alarmReservationReq {
  code: string;
  regionId: string;
  suggestion: string;
}

interface alarmReservationRes {
  success: boolean;
}

interface getRegionNameReq {
  region_id: string;
}

interface regionNameFetchRes {
  region: string;
}

interface getRegionNameRes {
  success: boolean;
  data?: regionNameFetchRes;
}
