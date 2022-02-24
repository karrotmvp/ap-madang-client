import { useCallback, useEffect } from 'react';

import { logEvent } from '@firebase/analytics';
import { useQueryParams } from '@karrotframe/navigator';
import { detailMeetingIdAtom, meetingsAtom } from '@store/meeting';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { analytics } from '../../../App';
import { meetingListHandler } from './useGetMeetingList';

type queryParams = {
  [key: string]: string;
};

const QUERY_KEY = 'meeting';

function useMeetingDetail() {
  const [openMeetingId, setOpenMeetingId] = useRecoilState(detailMeetingIdAtom);
  const queryParams: Partial<queryParams> = useQueryParams();
  const [meetings, setMeetings] = useRecoilState(meetingsAtom);

  const history = useHistory();

  const handleQueryMeetingId = useCallback(async () => {
    const meetingId = Number(queryParams[QUERY_KEY]);
    logEvent(analytics, `shared_meeting_${meetingId}__show`);
    setOpenMeetingId(meetingId);
    const path = getOriginPath(QUERY_KEY);
    path && history.replace(path);
  }, [history, queryParams, setOpenMeetingId]);

  useEffect(() => {
    if (queryParams[QUERY_KEY]) {
      handleQueryMeetingId();
    }
  }, [queryParams, handleQueryMeetingId]);

  const openMeetingDetail = async (id: number) => {
    if (meetings.findIndex(meeting => meeting.id === id) === -1) {
      await meetingListHandler({ setMeetings });
    }
    setOpenMeetingId(id);
  };

  const closeMeetingDetail = () => {
    setOpenMeetingId(undefined);
  };

  return { openMeetingId, openMeetingDetail, closeMeetingDetail };
}

// Query String에서 key 인자를 제거한 path를 반환한다.
export const getOriginPath = (key: string) => {
  const queryString = window.location.hash.split('?')[1];
  const path = new URLSearchParams(queryString);
  if (!path.has(key)) return undefined;
  path.delete(key);

  const urlPath = window.location.hash.substring(
    1,
    window.location.hash.lastIndexOf('?'),
  );

  return urlPath + '?' + path.toString(); //  ex) /path/name?_si=0
};

export default useMeetingDetail;
