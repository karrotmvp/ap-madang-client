import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { COLOR } from '../../constant/color';
import { LANDING } from '../../constant/message';
import { currMeetings, upcomingMeetings } from '../../store/meeting';
import MeetingCard from '../MeetingCard/MeetingCard';

interface Props {
  title: string;
}

const MeetingListWrapper = styled.div`
  box-sizing: border-box;
  margin: 0 1.6rem 3rem 1.6rem;
`;

const ListTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.3px;
  color: ${COLOR.TEXT_REAL_BLACK};
  margin: 0 0 1.2rem 0.4rem;
`;

function MeetingList({ title }: Props): ReactElement {
  const meetings = useRecoilValue(
    title === LANDING.CURRENT_MEETING ? currMeetings : upcomingMeetings,
  );

  return (
    <MeetingListWrapper>
      <ListTitle>{title}</ListTitle>
      {meetings !== 0 ? (
        meetings.map(el => {
          return <MeetingCard key={el.id} data={el} />;
        })
      ) : (
        <div>loading.....</div>
      )}
    </MeetingListWrapper>
  );
}

export default MeetingList;
