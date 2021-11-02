import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import empty_current_meeting from '../../../../assets/image/empty_current_meeting.png';
import { COLOR } from '../../../../constant/color';
import { LANDING } from '../../../../constant/message';
import { currMeetings } from '../../../../store/meeting';
import CurrMeetingCard from '../MeetingCard/CurrMeetingCard';

interface Props {
  className?: string;
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
  font-weight: bold;
  padding-left: 0.4rem;
  font-size: 1.8rem;
  line-height: 2.8rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_BLACK};
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

const EmptyListWrapper = styled.div`
  height: 14.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyListImg = styled.img`
  height: 100%;
`;

function CurrMeetingList({ className }: Props): ReactElement {
  const meetings = useRecoilValue(currMeetings);
  return (
    <CurrMeetingListWrapper
      className={classnames('curr-meeting-list', className)}
    >
      <TitleWrapper>
        <Title>{LANDING.CURRENT_MEETING}</Title>
      </TitleWrapper>

      {meetings.length === 0 ? (
        <EmptyListWrapper>
          <EmptyListImg src={empty_current_meeting} />
        </EmptyListWrapper>
      ) : meetings.length === 1 ? (
        <CardWrapper>
          <CurrMeetingCard data={meetings[0]} idx={0} total={1} />
        </CardWrapper>
      ) : (
        meetings.length > 1 && (
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
            </Swiper>
          </SwiperWrapper>
        )
      )}
    </CurrMeetingListWrapper>
  );
}

export default CurrMeetingList;
