import { useEffect } from 'react';

import { getMeetings } from '@api/v2/meeting';
import { useQueryParams } from '@karrotframe/navigator';
import { detailMeetingIdAtom, meetingsAtom } from '@store/meeting';
import { getRegionId } from '@util/utils';
import { MeetingList } from 'meeting-v2';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';

type queryParams = {
  [key: string]: string;
};

const useGetMeetingList = () => {
  const [meetings, setMeetings] = useRecoilState(meetingsAtom);

  const queryParams: Partial<queryParams> = useQueryParams();
  const detailMeetingId = useRecoilValue(detailMeetingIdAtom);

  useEffect(() => {
    meetingListHandler({ setMeetings });
  }, [queryParams, setMeetings, detailMeetingId]);

  return { meetings };
};

export const meetingListHandler = async ({
  setMeetings,
}: {
  setMeetings: SetterOrUpdater<MeetingList[]>;
}) => {
  const regionId = getRegionId(window.location.search);

  if (!regionId) return;
  const result = await getMeetings(regionId);
  if (result.success && result.data) {
    const sortMeetings = result.data.sort((a, b) => {
      if (a.live_status === 'live') return -1;
      if (a.live_status === b.live_status) {
        if (a.date === b.date) return a.start_time < b.start_time ? 1 : -1;
        return a.date < b.date ? 1 : -1;
      }
      return 1;
    });
    setMeetings(sortMeetings);
  }
};

export default useGetMeetingList;
