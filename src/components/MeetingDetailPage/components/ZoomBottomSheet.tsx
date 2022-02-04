import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { increaseMeetingEnterUserCount } from '../../../api/meeting';
import { analytics } from '../../../App';
import closeBtn from '../../../assets/icon/common/nav_close.svg';
import arrow_iOS_xsmall_green from '../../../assets/icon/detailPage/arrow_iOS_xsmall_green.svg';
import cam from '../../../assets/icon/detailPage/cam.svg';
import mic from '../../../assets/icon/detailPage/mic.svg';
import zoom_logo__white from '../../../assets/icon/detailPage/zoom_logo__white.svg';
import zoom_view from '../../../assets/image/zoom_view.png';
import BottomSheet from '../../../components/common/BottomSheet';
import { ZOOM_BOTTOM_SHEET } from '../../../constant/message';
import { COLOR } from '../../../style/color';

interface Props {
  onClose: () => void;
  onClickJoin?: () => void;
  meetingId: string;
  meetingTitle: string;
  url: string;
}

function ZoomBottomSheet({
  onClose,
  onClickJoin,
  url,
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
    const windowReference = window.open(url, '_blank');

    await increaseMeetingEnterUserCount(meetingId);
    logEvent(analytics, 'zoom_bottom_sheet_join__click', {
      location: 'zoom_bottom_sheet',
      meeting_id: meetingId,
      meeting_name: meetingTitle,
    });
    windowReference;
    onClickJoin && onClickJoin();
  }, [meetingId, meetingTitle, onClickJoin, url]);

  return (
    <BottomSheet
      className="zoom_bottom_sheet"
      onClose={onClickOutSide}
      open={closeState}
      showCloseButton={false}
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
            <ZoomGuide
              onClick={() =>
                window.open(process.env.INFO_NOTION_URL || '', '', '_blank')
              }
            >
              {ZOOM_BOTTOM_SHEET.ZOOM_GUIDE}{' '}
              <img src={arrow_iOS_xsmall_green} />
            </ZoomGuide>
          </DescriptionWrapper>
        </ContentsWrapper>
      </InfoTextWrapper>
      <ZoomJoinBtn onClick={onClickJoinHandler}>
        <ZoomIcon src={zoom_logo__white} />
        <ZoomJoinText>으로 모임 참여하기</ZoomJoinText>
      </ZoomJoinBtn>
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

const ZoomJoinBtn = styled.div`
  margin: 0 2rem 1.8rem 2rem;
  padding: 0.95rem 0;
  background: #0185fa;
  border-radius: 0.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ZoomIcon = styled.img`
  margin-right: 0.3rem;
`;

const ZoomJoinText = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.5rem;
  color: white;
`;

export default ZoomBottomSheet;
