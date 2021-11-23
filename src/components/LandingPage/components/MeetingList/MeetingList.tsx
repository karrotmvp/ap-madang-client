import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { MeetingList } from 'meeting';

import { COLOR } from '../../../../constant/color';
import { LANDING } from '../../../../constant/message';
import MeetingCard from '../MeetingCard/MeetingCard';
import SkeletonCard from '../MeetingCard/SkeletonCard';

interface Props {
  title: string;
  className?: string;
  meetings: MeetingList[];
  hasMeetings: boolean;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingList[]>>;
}

function MeetingList({
  title,
  className,
  meetings,
  hasMeetings,
  setMeetings,
}: Props): ReactElement {
  return (
    <MeetingListWrapper className={classnames('meeting-list', className)}>
      <ListTitle>
        {title === LANDING.UPCOMING_MEETING ? (
          <Title>
            {LANDING.UPCOMING_MEETING_01}
            <MeetingCounter className="title2 meeting-list__counter">
              {meetings && meetings.length.toString()}
            </MeetingCounter>
            {LANDING.UPCOMING_MEETING_02}
          </Title>
        ) : (
          <Title>
            {title}
            <MeetingCounter className="title2 meeting-list__counter">
              {meetings && meetings.length.toString()}
            </MeetingCounter>
          </Title>
        )}
      </ListTitle>

      {meetings.length !== 0 ? (
        meetings.map((el, idx) => {
          return (
            <MeetingCard
              key={el.id}
              data={el}
              idx={idx}
              setMeetings={setMeetings}
            />
          );
        })
      ) : (
        <div></div>
      )}
      {!hasMeetings && <SkeletonCard />}
    </MeetingListWrapper>
  );
}

const MeetingListWrapper = styled.div`
  box-sizing: border-box;
  padding: 5rem 1.6rem 5rem 1.6rem;
  .meeting-card:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MeetingCounter = styled.span`
  color: ${COLOR.LIGHT_GREEN};
  margin-left: 0.5rem;
  margin-right: 0.2rem;
`;

const ListTitle = styled.div`
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: -0.05rem;
  color: ${COLOR.TEXT_BLACK};
  padding-left: 0.4rem;
`;

export default MeetingList;
