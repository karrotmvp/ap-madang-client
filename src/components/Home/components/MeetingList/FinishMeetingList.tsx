import React from 'react';

import Divider from '@components/common/Divider';
import styled from '@emotion/styled';
import { MeetingList } from 'meeting-v2';

import MeetingCard from '../MeetingCard';
import Spacing from '../Spacing';
import LineDivider from './LineDivider';

type Props = {
  meetings: MeetingList[];
};

function FinishMeetingList({ meetings }: Props) {
  const existMeeting = meetings.length !== 0;
  return existMeeting ? (
    <section>
      <Divider size="0.1rem" color="rgba(33, 33, 36, 0.07)" />
      <Spacing height="3.2rem" />
      <Title>지난 모임방</Title>
      {meetings.map(meeting => (
        <div key={meeting.id}>
          <MeetingCard key={meeting.id} {...meeting} />
          <LineDivider />
        </div>
      ))}
    </section>
  ) : null;
}

const Title = styled.h2`
  font-size: 1.8rem;
  line-height: 2.2rem;
  letter-spacing: -0.04rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.$gray900};
`;

export default FinishMeetingList;
