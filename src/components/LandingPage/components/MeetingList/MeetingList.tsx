import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { MeetingList } from 'meeting';

import { COLOR } from '../../../../constant/color';
import Divider from '../../../common/Divider';
import MeetingCard from '../MeetingCard/MeetingCard';
import SkeletonCard from '../MeetingCard/SkeletonCard';

interface Props {
  className?: string;
  meetings: MeetingList[];
  hasMeetings: boolean;
  setMeetings: React.Dispatch<React.SetStateAction<MeetingList[]>>;
}

function MeetingList({
  className,
  meetings,
  hasMeetings,
  setMeetings,
}: Props): ReactElement {
  return (
    <MeetingListWrapper className={classnames('meeting-list', className)}>
      <ListTitle>
        <Title>
          다가오는 모임
          <MeetingCounter className="title2 meeting-list__counter">
            {meetings && meetings.length.toString()}
          </MeetingCounter>
        </Title>
      </ListTitle>

      {meetings.length !== 0 ? (
        meetings.map((el, idx) => {
          return (
            <div key={el.id}>
              <MeetingCard
                key={el.id}
                data={el}
                idx={idx}
                setMeetings={setMeetings}
              />
              {meetings.length - 1 !== idx && <Divider size="0.1rem" />}
            </div>
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

const MeetingCounter = styled.div`
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
