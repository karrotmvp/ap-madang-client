import { useCallback, useEffect, useState } from 'react';

import { getMeetings } from '@api/v2/meeting';
import { useQueryParams } from '@karrotframe/navigator';
import { detailMeetingIdAtom, meetingsAtom } from '@store/meeting';
import { getRegionId } from '@util/utils';
import { useRecoilState, useRecoilValue } from 'recoil';

type fetchingStateType = 'LOADING' | 'SUCCESS' | 'ERROR';
type queryParams = {
  [key: string]: string;
};

const useGetMeetingList = () => {
  const [meetings, setMeetings] = useRecoilState(meetingsAtom);
  const [fetchingState, setFetchingState] =
    useState<fetchingStateType>('LOADING');
  const queryParams: Partial<queryParams> = useQueryParams();
  const detailMeetingId = useRecoilValue(detailMeetingIdAtom);

  const regionId = getRegionId(window.location.search);

  const meetingListHandler = useCallback(async () => {
    if (!regionId) return;

    const result = await getMeetings(regionId);
    if (result.success && result.data) {
      setMeetings(result.data);
      setFetchingState('SUCCESS');
    } else setFetchingState('ERROR');
  }, [regionId, setMeetings]);

  useEffect(() => {
    setFetchingState('LOADING');
    meetingListHandler();
  }, [meetingListHandler, queryParams, detailMeetingId]);

  return { meetings, fetchingState };
};

export default useGetMeetingList;
