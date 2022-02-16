import React, { useCallback, useEffect, useState } from 'react';

import { MeetingList as MeetingListType } from 'meeting-v2';

import { getMeetings } from '../../../../api/v2/meeting';
import { getRegionId } from '../../../../util/utils';
import MeetingCard from '../MeetingCard';
import LineDivider from '../MeetingCard/LineDivider';

function MeetingList() {
  const [meetings, setMeetings] = useState<MeetingListType[]>([]);

  const meetingListHandler = useCallback(async () => {
    const region_id = getRegionId(window.location.search);
    if (!region_id) return;
    const result = await getMeetings(region_id);
    if (result.success && result.data) setMeetings(result.data);
  }, [setMeetings]);

  useEffect(() => {
    meetingListHandler();
  }, [meetingListHandler]);

  return (
    <section>
      {meetings.map(meeting => (
        <div key={meeting.id}>
          <MeetingCard key={meeting.id} {...meeting} />
          <LineDivider />
        </div>
      ))}
    </section>
  );
}

export default MeetingList;
