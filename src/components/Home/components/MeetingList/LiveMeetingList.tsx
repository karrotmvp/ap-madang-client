import React from 'react';

import styled from '@emotion/styled';
import { MeetingList } from 'meeting-v2';

import EmptyMeeting from '../EmptyMeeting';
import MeetingCard from '../MeetingCard';
import LineDivider from './LineDivider';

type Props = {
  meetings: MeetingList[];
};

function LiveMeetingList({ meetings }: Props) {
  const existMeeting = meetings.length !== 0;
  const isNotLastMeeting = (idx: number) => meetings.length - 1 !== idx;
  return (
    <section>
      {existMeeting ? (
        <MeetingWrapper>
          {meetings.map((meeting, idx) => (
            <CardWrapper key={meeting.id}>
              <MeetingCard key={meeting.id} {...meeting} />
              {isNotLastMeeting(idx) && <LineDivider />}
            </CardWrapper>
          ))}
        </MeetingWrapper>
      ) : (
        <EmptyMeeting />
      )}
    </section>
  );
}

const CardWrapper = styled.div`
  margin: 0 1.6rem;
`;

const MeetingWrapper = styled.div`
  margin: 1.6rem 0;
`;

export default LiveMeetingList;
