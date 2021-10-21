import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { COLOR } from '../../constant/color';
import { LANDING } from '../../constant/message';
import { currMeetings } from '../../store/meeting';
import CurrMeetingCard from '../MeetingCard/CurrMeetingCard';

interface Props {
  title: string;
  className?: string;
}

const CurrMeetingListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 3rem 0 3rem 0;

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
// const EmptyBlock = styled.div`
//   width: 0rem;
// `;

const TitleWrapper = styled.div`
  padding-left: 0.4rem;
  margin-bottom: 2.2rem;
  padding: 0 1.6rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_REAL_BLACK};
  margin-bottom: 0.4rem;
`;

const SubTitle = styled.div`
  color: ${COLOR.TEXT_GRAY};
`;

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwiperWrapper = styled.div`
  box-sizing: border-box;
  overflow: visible;
`;

function CurrMeetingList({ title, className }: Props): ReactElement {
  const meetings = useRecoilValue(currMeetings);
  return (
    <CurrMeetingListWrapper
      className={classnames('curr-meeting-list', className)}
    >
      <TitleWrapper>
        <Title>{title}</Title>
        <SubTitle className="body3">{LANDING.CURR_MEETING_SUB_TITLE}</SubTitle>
      </TitleWrapper>

      {meetings && meetings.length === 1 && (
        <CardWrapper>
          <CurrMeetingCard data={meetings[0]} idx={0} total={1} />
        </CardWrapper>
      )}
      {meetings && meetings.length > 1 && (
        <SwiperWrapper>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={16}
            freeMode={true}
            className="mySwiper"
          >
            <SwiperSlide />
            {meetings.map((el, idx) => {
              return (
                <SwiperSlide key={el.id}>
                  <CurrMeetingCard data={el} idx={idx} />
                </SwiperSlide>
              );
            })}
            <SwiperSlide />
            <SwiperSlide />
          </Swiper>
        </SwiperWrapper>
      )}
    </CurrMeetingListWrapper>
  );
}

export default CurrMeetingList;
