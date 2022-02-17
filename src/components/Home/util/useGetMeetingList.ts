import { useCallback, useEffect, useState } from 'react';

import { getMeetings } from '@api/v2/meeting';
import { MeetingList as MeetingListType } from 'meeting-v2';

type fetchingStateType = 'LOADING' | 'SUCCESS' | 'ERROR';

const useGetMeetingList = (regionId: string) => {
  const [meetings, setMeetings] = useState<MeetingListType[]>([]);

  const [fetchingState, setFetchingState] =
    useState<fetchingStateType>('LOADING');

  const meetingListHandler = useCallback(async () => {
    if (!regionId) return;
    const result = await getMeetings(regionId);
    if (result.success && result.data) {
      setMeetings(result.data);
      setFetchingState('SUCCESS');
    } else setFetchingState('ERROR');
  }, [regionId]);

  useEffect(() => {
    setFetchingState('LOADING');
    meetingListHandler();
  }, [meetingListHandler]);

  return { meetings, fetchingState };
};

export default useGetMeetingList;
