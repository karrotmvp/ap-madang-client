import customAxios from '../util/request';

export const alarmReservation = async ({
  code,
  region_id,
  suggestion,
}: alarmReservationReq) => {
  try {
    await customAxios.post('/reservation/', {
      code,
      region_id,
      suggestion,
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
};

export const getRegionName = async ({ region_id }: regionNameReq) => {
  try {
    let result = await customAxios.get<regionNameRes>('/reservation/region', {
      params: { region_id: region_id },
    });
    return { success: true, data: result.data };
  } catch (e) {
    return { success: false };
  }
};

interface alarmReservationReq {
  code: string;
  region_id: string;
  suggestion: string;
}

interface regionNameReq {
  region_id: string;
}

interface regionNameRes {
  region: string;
}
