import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { MeetingList } from 'meeting';

import { LANDING } from '../../../constant/message';
import { COLOR } from '../../../style/color';
import MyMeetingCard from './MyMeetingCard';

interface Props {
  className?: string;
  meetings: MeetingList[];
  title?: string;
}

function MyMeetingList({ className, meetings, title }: Props): ReactElement {
  return (
    <CurrMeetingListWrapper
      className={classnames('curr-meeting-list', className)}
    >
      <TitleWrapper>
        <Title>{title ? title : LANDING.CURRENT_MEETING}</Title>
      </TitleWrapper>
      <CardWrapper>
        {meetings.map((el, idx) => {
          return <MyMeetingCard data={el} idx={idx} key={el.id} />;
        })}
      </CardWrapper>
    </CurrMeetingListWrapper>
  );
}

const CurrMeetingListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 3.2rem 1.6rem 5rem 1.6rem;

  .swiper {
    width: 100%;
  }

  .swiper-wrapper {
    box-sizing: border-box;
  }

  .swiper-slide {
    width: auto;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.div`
  font-weight: 700;
  padding-left: 0.4rem;

  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: -0.05rem;
  color: ${COLOR.TEXT_BLACK};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .meeting-card:last-child {
    margin-bottom: 0;
  }
`;

export default MyMeetingList;
