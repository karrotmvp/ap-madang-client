import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import { COLOR } from '../../constant/color';
import useInterval from '../../hook/useInterval';
import { meetingType } from '../../store/meeting';
import { getRemainFullTime } from '../../util/utils';
interface Props {
  data: meetingType;
  idx: number;
  total?: number;
}

interface WrapperProps {
  idx: number;
  live_status: 'live' | 'upcoming' | 'tomorrow' | 'finish';
  total?: number;
}

interface ThumbnailProps {
  total?: number;
}

const MeetingCardWrapper = styled.div<WrapperProps>`
  margin: ${({ total }) => (total === 1 ? '0 1.6rem' : '0')};
  width: ${({ total }) => (total === 1 ? '100%' : '25.8rem')};
  height: ${({ total }) => (total === 1 ? '28.9rem' : '28.3rem')};
  border: 1px solid ${COLOR.TEXTAREA_LIGHT_GRAY};
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 300px) {
    width: 21.8rem;
  }
`;

const ImageWrapper = styled.div<ThumbnailProps>`
  width: 100%;
  height: ${({ total }) => (total === 1 ? '15.1rem' : '11.9rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;
const Thumbnail = styled.img`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LiveTag = styled.div`
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding: 0.4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_WHITE};
  background-color: ${COLOR.ORANGE};
  border-radius: 0.6rem;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  padding: 1.4rem 0.9rem 1.3rem 0.9rem;
  display: flex;
  flex-direction: column;
`;
const InfoWrapper = styled.div`
  flex: 1;
  padding: 0 0.4rem;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.4rem;
`;

const Timer = styled.div`
  color: ${COLOR.ORANGE};
`;

const Title = styled.div`
  font-weight: 600;
  height: 5.2rem;
  font-size: 1.7rem;
  line-height: 2.6rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Button = styled.div`
  width: 100%;
  height: 4rem;
  background: ${COLOR.LIGHT_GREEN_BACKGROUND};
  border-radius: 0.6rem;
  font-size: 1.4rem;
  line-height: 1.7rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.LIGHT_GREEN};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function CurrMeetingCard({ idx, data, total }: Props): ReactElement {
  const { push } = useNavigator();
  const [remainTime, setRemainTime] = useState('');

  const onClickCardHandler = useCallback(() => {
    push(`/meetings/${data.id}`);
  }, [data.id, push]);

  useInterval(() => {
    setRemainTime(getRemainFullTime(data.end_time));
  }, 1000);

  useEffect(() => {
    setRemainTime(getRemainFullTime(data.end_time));
  }, [data.date, data.end_time, data.start_time]);

  return (
    <MeetingCardWrapper
      className="meeting-card"
      live_status={data.live_status}
      idx={idx}
      total={total}
      onClick={onClickCardHandler}
    >
      <ImageWrapper total={total}>
        <LiveTag>진행중</LiveTag>
        <Thumbnail src={data.image} />
      </ImageWrapper>
      <ContentsWrapper>
        <InfoWrapper>
          <TimeWrapper>
            <Timer className="body3">{remainTime}후에 종료돼요</Timer>
          </TimeWrapper>
          <Title className="title">{data.title}</Title>
        </InfoWrapper>
        <Button>모임 정보 보러가기</Button>
      </ContentsWrapper>
    </MeetingCardWrapper>
  );
}

export default CurrMeetingCard;
