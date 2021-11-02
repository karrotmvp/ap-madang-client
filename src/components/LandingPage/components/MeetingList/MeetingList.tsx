import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { COLOR } from '../../../../constant/color';
import { LANDING } from '../../../../constant/message';
import {
  meetingsAtom,
  tomorrowMeetings,
  upcomingMeetings,
} from '../../../../store/meeting';
import MeetingCard from '../MeetingCard/MeetingCard';
import SkeletonCard from '../MeetingCard/SkeletonCard';

interface Props {
  title: string;
  className?: string;
}

const MeetingListWrapper = styled.div`
  box-sizing: border-box;
  padding: 3rem 1.6rem 2rem 1.6rem;
`;

const MeetingCounter = styled.span`
  color: ${COLOR.LIGHT_GREEN};
  margin-left: 0.6rem;
`;

const ListTitle = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_BLACK};
  padding-left: 0.4rem;
`;

function MeetingList({ title, className }: Props): ReactElement {
  const meetings = useRecoilValue(
    title === LANDING.UPCOMING_MEETING ? upcomingMeetings : tomorrowMeetings,
  );

  const allMeeting = useRecoilValue(meetingsAtom);

  return (
    <MeetingListWrapper className={classnames('meeting-list', className)}>
      <ListTitle>
        {title}
        {title !== LANDING.CURRENT_MEETING && (
          <MeetingCounter className="title2 meeting-list__counter">
            {meetings && meetings.length.toString()}
          </MeetingCounter>
        )}
      </ListTitle>

      {meetings.length !== 0 ? (
        meetings.map((el, idx) => {
          return <MeetingCard key={el.id} data={el} idx={idx} />;
        })
      ) : (
        <div></div>
      )}
      {allMeeting.length === 0 && <SkeletonCard />}
    </MeetingListWrapper>
  );
}

export default MeetingList;
