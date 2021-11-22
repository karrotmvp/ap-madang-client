import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { MeetingList } from 'meeting';

import camera_meeting_tag__gray from '../../../../assets/icon/detailPage/camera_meeting_tag__gray.svg';
import voice_meeting_tag__gray from '../../../../assets/icon/detailPage/voice_meeting_tag__gray.svg';
import { COLOR } from '../../../../constant/color';
import Gradient from '../../../common/Gradient';
import CurrMeetingTimer from '../CurrMeetingTimer';
import ParticipantNum from '../ParticipantNum';

interface Props {
  data: MeetingList;
  idx: number;
}

interface WrapperProps {
  idx: number;
  live_status: 'live' | 'upcoming' | 'tomorrow' | 'finish';
}

function CurrMeetingCard({ idx, data }: Props): ReactElement {
  const { push } = useNavigator();

  const onClickCardHandler = useCallback(() => {
    push(`/meetings/${data.id}`);
  }, [data.id, push]);

  return (
    <MeetingCardWrapper
      className="meeting-card"
      live_status={data.live_status}
      idx={idx}
      onClick={onClickCardHandler}
    >
      <ImageWrapper>
        <TagWrapper>
          <LiveTag>진행중</LiveTag>
          <MeetingTypeTag
            src={
              data.is_video ? camera_meeting_tag__gray : voice_meeting_tag__gray
            }
          />
        </TagWrapper>

        <Gradient gradient="linear-gradient(180deg, rgba(17, 17, 17, 0.4) 25.52%, rgba(17, 17, 17, 0) 100%);">
          <Thumbnail src={data.image} />
        </Gradient>
      </ImageWrapper>
      <ContentsWrapper>
        <InfoWrapper>
          <CurrMeetingTimer
            date={data.date}
            start_time={data.start_time}
            end_time={data.end_time}
          />
          <Title className="title">{data.title}</Title>
          {data.user_enter_cnt !== 0 && (
            <ParticipantNum userMeetingNum={data.user_enter_cnt} />
          )}
        </InfoWrapper>
        <Button>모임 정보 보러가기</Button>
      </ContentsWrapper>
    </MeetingCardWrapper>
  );
}

const MeetingCardWrapper = styled.div<WrapperProps>`
  margin: 0 1.6rem 1.6rem 1.6rem;
  width: 100%;
  height: 28.9rem;
  border: 1px solid ${COLOR.TEXTAREA_LIGHT_GRAY};
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 300px) {
    width: 21.8rem;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 15.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  position: relative;
`;

const TagWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 1.1rem;
  top: 1.1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  z-index: 1;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LiveTag = styled.div`
  position: relative;
  padding: 0.5rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.4rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_WHITE};
  background-color: ${COLOR.ORANGE};
  border-radius: 0.4rem;
`;

const MeetingTypeTag = styled.img`
  margin-left: 0.6rem;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  padding: 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
`;
const InfoWrapper = styled.div`
  flex: 1;
  padding: 0 0.4rem;
`;

const Title = styled.div`
  font-weight: 600;
  max-height: 5.2rem;
  font-size: 1.7rem;
  line-height: 2.5rem;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_BLACK};
  margin-bottom: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  vertical-align: top;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
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

export default CurrMeetingCard;
