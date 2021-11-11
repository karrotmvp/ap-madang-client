import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useRecoilValue } from 'recoil';

import { increaseMeetingEnterUserCount } from '../../../api/meeting';
import { analytics } from '../../../App';
import arrow_iOS_xsmall_green from '../../../assets/icon/arrow_iOS_xsmall_green.svg';
import cam from '../../../assets/icon/cam.svg';
import mic from '../../../assets/icon/mic.svg';
import closeBtn from '../../../assets/icon/nav_close.svg';
import bottom_sheet_btn from '../../../assets/image/bottom_sheet_btn.png';
import zoom_view from '../../../assets/image/zoom_view.png';
import BottomSheet from '../../../components/common/BottomSheet';
import { COLOR } from '../../../constant/color';
import { ZOOM_BOTTOM_SHEET } from '../../../constant/message';
import { userInfoAtom } from '../../../store/user';

interface Props {
  onClose: () => void;
  onClickJoin?: () => void;
  zoomGuideHandler?: () => void;
  meetingId: string;
  meetingTitle: string;
  url: string;
}

function ZoomBottomSheet({
  onClose,
  onClickJoin,
  zoomGuideHandler,
  url,
  meetingId,
  meetingTitle,
}: Props): ReactElement {
  const [closeState, setCloseState] = useState(!open);
  const userInfo = useRecoilValue(userInfoAtom);

  const closeHandler = useCallback(() => {
    setCloseState(true);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  const onClickOutSide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    closeHandler();
  };

  const onClickJoinHandler = async () => {
    const redirectWindow = window.open(url, '_blank');
    await increaseMeetingEnterUserCount(meetingId);
    redirectWindow && redirectWindow.location;
    logEvent(analytics, 'zoom_bottom_sheet_join__click', {
      location: 'zoom_bottom_sheet',
      meeting_id: meetingId,
      meeting_name: meetingTitle,
      userNickname: userInfo?.nickname,
      userRegion: userInfo?.region,
    });
    onClickJoin && onClickJoin();
  };

  return (
    <BottomSheet
      className="zoom_bottom_sheet"
      onClose={onClickOutSide}
      open={closeState}
    >
      <InfoTextWrapper>
        <TitleWrapper>
          <InfoTitle>{ZOOM_BOTTOM_SHEET.TITLE}</InfoTitle>
          <IconImg src={closeBtn} onClick={closeHandler} />
        </TitleWrapper>
        <ContentsWrapper>
          <ImageWrapper>
            <ZoomViewImg src={zoom_view} />
          </ImageWrapper>
          <DescriptionWrapper>
            <DescriptionItem>
              <DescriptionIcon src={cam} />
              <DescriptionText className="body3">
                {ZOOM_BOTTOM_SHEET.SUB_TITLE_01}
              </DescriptionText>
            </DescriptionItem>
            <DescriptionItem>
              <DescriptionIcon src={mic} />
              <DescriptionText className="body3">
                {ZOOM_BOTTOM_SHEET.SUB_TITLE_02}
              </DescriptionText>
            </DescriptionItem>
            <ZoomGuide onClick={zoomGuideHandler}>
              {ZOOM_BOTTOM_SHEET.ZOOM_GUIDE}{' '}
              <img src={arrow_iOS_xsmall_green} />
            </ZoomGuide>
          </DescriptionWrapper>
        </ContentsWrapper>
      </InfoTextWrapper>
      <JoinBtnBlue src={bottom_sheet_btn} onClick={onClickJoinHandler} />
    </BottomSheet>
  );
}

const InfoTextWrapper = styled.div`
  padding: 2rem 2.4rem 2rem 2.4rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.8rem;
  text-align: center;
  letter-spacing: -0.04rem;
`;

const IconImg = styled.img`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ImageWrapper = styled.div`
  flex: 22.5;
`;

const ZoomViewImg = styled.img`
  width: 100%;
`;

const DescriptionWrapper = styled.div`
  padding-top: 0.7rem;
  padding-left: 1.2rem;
  flex: 77.5;
  display: flex;
  flex-direction: column;
`;

const DescriptionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const DescriptionIcon = styled.img`
  margin-right: 0.8rem;
`;

const DescriptionText = styled.div``;

const ZoomGuide = styled.div`
  align-self: flex-end;
  color: ${COLOR.LIGHT_GREEN};
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 2rem;
  letter-spacing: -0.03rem;
  text-decoration-line: underline;
  margin-top: 0.8rem;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JoinBtnBlue = styled.img`
  width: auto;
  height: 4.4rem;
  margin: 0 2rem 1.8rem 2rem;
  text-decoration: none;
  outline: none;
  box-sizing: border-box;
`;

export default ZoomBottomSheet;
