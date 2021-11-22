import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { MeetingList } from 'meeting';

import { COLOR } from '../../../../constant/color';
import { LANDING } from '../../../../constant/message';
import CurrMeetingCard from '../MeetingCard/CurrMeetingCard';

interface Props {
  className?: string;
  meetings: MeetingList[];
}

function CurrMeetingList({ className, meetings }: Props): ReactElement {
  return (
    <CurrMeetingListWrapper
      className={classnames('curr-meeting-list', className)}
    >
      <TitleWrapper>
        <Title>{LANDING.CURRENT_MEETING}</Title>
      </TitleWrapper>
      <CardWrapper>
        {meetings.map((el, idx) => {
          return <CurrMeetingCard data={el} idx={idx} key={el.id} />;
        })}
      </CardWrapper>
    </CurrMeetingListWrapper>
  );
}

const CurrMeetingListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 3rem 0;

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
  margin-bottom: 1.8rem;
  padding: 0 1.6rem;
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
  padding: 0 1.6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .meeting-card:last-child {
    margin-bottom: 0;
  }
`;

export default CurrMeetingList;
