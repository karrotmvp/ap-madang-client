import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';
import { LiveStatus, MeetingList } from 'meeting';

import camera_meeting_tag__gray from '../../../../assets/icon/detailPage/camera_meeting_tag__gray.svg';
import voice_meeting_tag__gray from '../../../../assets/icon/detailPage/voice_meeting_tag__gray.svg';
import { COLOR } from '../../../../constant/color';
import Gradient from '../../../common/Gradient';
import ParticipantNum from '../ParticipantNum';
import UserProfile from '../UserProfile';

interface Props {
  data: MeetingList;
  idx: number;
}

interface WrapperProps {
  idx: number;
  live_status: LiveStatus;
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
          <Title className="title">
            <Tag color={COLOR.ORANGE}>진행중</Tag>
            {data.title}
          </Title>
          <UserProfileWrapper>
            <UserProfile
              profileUrl={data.host.profile_image_url}
              nickname={data.host.nickname}
              region={data.host.region_name || ''}
            />
          </UserProfileWrapper>
          {data.user_enter_cnt !== 0 && (
            <ParticipantNum userMeetingNum={data.user_enter_cnt} />
          )}
        </InfoWrapper>
      </ContentsWrapper>
    </MeetingCardWrapper>
  );
}

const MeetingCardWrapper = styled.div<WrapperProps>`
  margin-bottom: 1.6rem;
  width: 100%;
  height: auto;
  border: 1px solid ${COLOR.TEXTAREA_LIGHT_GREY};
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0px 2px 10px 0px hsla(0, 0%, 7%, 0.1);

  @media (max-width: 300px) {
    width: 21.8rem;
  }
`;

const ImageWrapper = styled.div`
  height: 12rem;
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

const MeetingTypeTag = styled.img`
  margin-left: 0.6rem;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
`;
const InfoWrapper = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 600;
  max-height: 5.2rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  vertical-align: top;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
`;

const UserProfileWrapper = styled.div`
  margin-top: 0.8rem;
`;

const Tag = styled.div<{ color: string }>`
  display: inline;
  color: ${({ color }) => (color ? color : COLOR.ORANGE)};
  margin-right: 0.6rem;
`;

export default CurrMeetingCard;
