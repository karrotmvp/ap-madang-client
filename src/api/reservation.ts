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

interface alarmReservationReq {
  code: string;
  region_id: string;
  suggestion: string;
}
