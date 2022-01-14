import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { increaseMeetingEnterUserCount } from '../../../api/meeting';
import { analytics } from '../../../App';
import closeBtn from '../../../assets/icon/common/nav_close.svg';
import agoraBottomSheet from '../../../assets/image/agora_bottom_sheet.png';
import { COLOR } from '../../../style/color';
import BottomSheet from '../../common/BottomSheet';

interface Props {
  onClose: () => void;
  onClickJoin?: () => void;
  code: string;
  meetingId: string;
  meetingTitle: string;
  url: string;
}

function AudioMeetBottomSheet({
  onClose,
  onClickJoin,
  code,
  meetingId,
  meetingTitle,
}: Props): ReactElement {
  const [closeState, setCloseState] = useState(!open);

  const closeHandler = useCallback(() => {
    setCloseState(true);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  const onClickOutSide = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.stopPropagation();
    closeHandler();
  };

  const onClickJoinHandler = useCallback(async () => {
    logEvent(analytics, 'audio_bottom_sheet_join__click', {
      location: 'audio_bottom_sheet',
      meeting_id: meetingId,
      meeting_name: meetingTitle,
    });
    const windowReference = window.open(
      `http://localhost:3000/#/agora?meeting_code=${code}`,
      '_blank',
    );

    await increaseMeetingEnterUserCount(meetingId);

    windowReference;
    onClickJoin && onClickJoin();
    closeHandler();
  }, [closeHandler, code, meetingId, meetingTitle, onClickJoin]);

  return (
    <BottomSheet
      className="audio_bottom_sheet"
      onClose={onClickOutSide}
      open={closeState}
    >
      <InfoTextWrapper>
        <HeaderWrapper>
          <IconImg src={closeBtn} onClick={closeHandler} />
        </HeaderWrapper>

        <ContentsWrapper>
          <AudioGuideImg src={agoraBottomSheet} />
          <Title>마이크 접근을 허용해 주세요</Title>
          <SubTitle>
            {`이웃과 자유롭게 대화를 나눌 수 있도록\n입장할 때 마이크 접근을 허용해 주세요.`}
          </SubTitle>
        </ContentsWrapper>
      </InfoTextWrapper>
      <JoinBtn onClick={onClickJoinHandler}>참여하기</JoinBtn>
    </BottomSheet>
  );
}

const InfoTextWrapper = styled.div`
  padding: 2rem 2.4rem 2rem 2.4rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const IconImg = styled.img`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AudioGuideImg = styled.img`
  width: 26.4rem;
  height: 23.7rem;
  margin: 0.4rem 0 2rem 0;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.8rem;
  line-height: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

const SubTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
  line-height: 2.3rem;

  text-align: center;
  letter-spacing: -0.3px;
  margin-bottom: 0.4rem;
  color: ${COLOR.TEXT_GREY};
`;

const JoinBtn = styled.div`
  box-sizing: border-box;
  width: calc(100% - 4rem);
  height: 4.4rem;
  margin: 0 2rem 1.8rem 2rem;

  background: ${COLOR.LIGHT_GREEN};
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

export default AudioMeetBottomSheet;
