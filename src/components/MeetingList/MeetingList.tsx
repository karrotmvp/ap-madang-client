import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { COLOR } from '../../constant/color';
import { LANDING } from '../../constant/message';
import {
  currMeetings,
  tomorrowMeetings,
  upcomingMeetings,
} from '../../store/meeting';
import MeetingCard from '../MeetingCard/MeetingCard';

interface Props {
  title: string;
}

const MeetingListWrapper = styled.div`
  box-sizing: border-box;
  padding: 3rem 1.6rem 3rem 1.6rem;
`;

const MeetingCounter = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.LIGHT_GREEN};
  margin-left: 0.6rem;
`;

const ListTitle = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_REAL_BLACK};
  padding-left: 0.4rem;
`;

function MeetingList({ title }: Props): ReactElement {
  const meetings = useRecoilValue(
    title === LANDING.CURRENT_MEETING
      ? currMeetings
      : title === LANDING.UPCOMING_MEETING
      ? upcomingMeetings
      : tomorrowMeetings,
  );

  return (
    <MeetingListWrapper>
      <ListTitle>
        {title}
        {title !== LANDING.CURRENT_MEETING && (
          <MeetingCounter>
            {meetings && meetings.length.toString()}
          </MeetingCounter>
        )}
      </ListTitle>
      {meetings !== 0 ? (
        meetings.map((el, idx) => {
          return <MeetingCard key={el.id} data={el} idx={idx} />;
        })
      ) : (
        <div>loading.....</div>
      )}
    </MeetingListWrapper>
  );
}

export default MeetingList;
