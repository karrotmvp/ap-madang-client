import React from 'react';

import useGetMeetingList from '../../hook/useGetMeetingList';
import MeetingCard from '../MeetingCard';
import LineDivider from './LineDivider';

function MeetingList() {
  const { meetings } = useGetMeetingList();

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

export default React.memo(MeetingList);
