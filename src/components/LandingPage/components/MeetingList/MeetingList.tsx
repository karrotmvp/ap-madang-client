import React, { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import dayjs from 'dayjs';
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
  const [dateList, setDateList] = useState<string[]>([]);

  useEffect(() => {
    const filteredDate = meetings.map(el => el.date);
    const result = filteredDate.reduce((unique: string[], item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, []);
    setDateList(result);
  }, [meetings]);

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
      {dateList.map((date, dateListIdx) => {
        const filteredMeetings = meetings.filter(el => el.date === date);
        return (
          <DateWrapper key={dateListIdx} className="date-list">
            <DateLabel>{dayjs(date).format('MM월 DD일')}</DateLabel>
            {filteredMeetings.map((meeting, meetingIdx) => {
              return (
                <div key={meeting.id}>
                  <MeetingCard
                    key={meeting.id}
                    data={meeting}
                    idx={meetingIdx}
                    setMeetings={setMeetings}
                  />
                  {filteredMeetings.length - 1 !== meetingIdx && (
                    <DividerStyle size="0.1rem" />
                  )}
                </div>
              );
            })}
          </DateWrapper>
        );
      })}

      {!hasMeetings && <SkeletonCard />}
    </MeetingListWrapper>
  );
}

const MeetingListWrapper = styled.div`
  box-sizing: border-box;
  padding: 4rem 0;
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
  margin: 0 1.6rem 1.4rem 1.6rem;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: -0.05rem;
  color: ${COLOR.TEXT_BLACK};
`;

const DateWrapper = styled.div`
  position: static;
  width: 100%;
  height: auto;
  box-sizing: border-box;

  .meeting-card:last-child {
    padding-bottom: 3.4rem;
  }
`;

const DateLabel = styled.div`
  box-sizing: border-box;
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  top: 0;
  background: ${COLOR.BACKGROUND_WHITE};
  z-index: 10;
  padding: 1rem 1.6rem;

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  color: ${COLOR.TEXT_BLACK};
`;

const DividerStyle = styled(Divider)`
  margin: 2rem 0;
`;

export default MeetingList;
