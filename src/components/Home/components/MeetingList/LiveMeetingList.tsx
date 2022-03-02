import React from 'react';

import { MeetingList } from 'meeting-v2';

import EmptyMeeting from '../EmptyMeeting';
import MeetingCard from '../MeetingCard';
import Spacing from '../Spacing';
import LineDivider from './LineDivider';

type Props = {
  meetings: MeetingList[];
};

function LiveMeetingList({ meetings }: Props) {
  const existMeeting = meetings.length !== 0;
  return (
    <section>
      {existMeeting ? (
        <>
          <Spacing height="1.6rem" />
          {meetings.map(meeting => (
            <div key={meeting.id}>
              <MeetingCard key={meeting.id} {...meeting} />
              <LineDivider />
            </div>
          ))}
        </>
      ) : (
        <EmptyMeeting />
      )}
    </section>
  );
}

export default LiveMeetingList;
