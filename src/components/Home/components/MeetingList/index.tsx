import React from 'react';

import { getRegionId } from '@util/utils';

import useGetMeetingList from '../../util/useGetMeetingList';
import MeetingCard from '../MeetingCard';
import LineDivider from './LineDivider';

function MeetingList() {
  const regionId = getRegionId(window.location.search);
  const { meetings } = useGetMeetingList(regionId);

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
