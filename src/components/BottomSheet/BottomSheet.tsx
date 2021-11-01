import React, { ReactElement, useCallback, useState } from 'react';

import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import classnamse from 'classnames';

import { analytics } from '../../App';
import closeBtn from '../../assets/icon/nav_close.svg';
import { COLOR } from '../../constant/color';
import { BOTTOM_SHEET } from '../../constant/message';
import DescriptionItem from '../Description/DescriptionItem';

const openSheetBackground = keyframes`
  0%{
    opacity:0;
  }
  100% {   
    opacity:1;
  }
`;

const closeSheetBackground = keyframes`
  0%{
    opacity:1;
  }
  100% {   
    opacity:0;
  }
`;

const openSheet = keyframes`
  0%{
    bottom:-20rem;
  }
  100% {   
    bottom:0;
  }
`;

const closeSheet = keyframes`
  0%{
    bottom:0;
  }
  100% {   
    bottom:-20rem;
  }
`;

const BottomSheetWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${COLOR.MODAL_WRAPPER_BLACK};
  box-sizing: border-box;
  border-radius: 0;

  z-index: 1000;
  &.open-bottom-sheet {
    animation: ${openSheetBackground} 0.5s ease forwards;
  }
  &.close-bottom-sheet {
    animation: ${closeSheetBackground} 0.5s ease forwards;
  }
`;

const ContentsWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: ${COLOR.TEXT_WHITE};
  border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  flex-direction: column;

  &.open-bottom-sheet {
    animation: ${openSheet} 0.5s ease forwards;
  }
  &.close-bottom-sheet {
    animation: ${closeSheet} 0.5s ease forwards;
  }
`;

const InfoTextWrapper = styled.div`
  padding: 2rem 2.4rem 1rem 2.4rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.8rem;
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

const JoinBtn = styled.a`
  height: 4.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #41ac70;
  margin: 0 2rem 1.8rem 2rem;
  border-radius: 0.6rem;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: center;
  letter-spacing: -0.03rem;
  color: white;

  text-decoration: none;
  outline: none;
`;

interface Props {
  onClose: () => void;
  onClickJoin?: () => void;
  meetingId: string;
  meetingTitle: string;
  url: string;
}

function BottomSheet({
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

  const onClickOutSide = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    closeHandler();
  };

  const onClickJoinHandler = () => {
    logEvent(analytics, 'bottom_sheet_join__click', {
      location: 'bottom_sheet',
      meeting_id: meetingId,
      meeting_name: meetingTitle,
    });
    window.open(url, '', '_blank');
    onClickJoin && onClickJoin();
  };

  return (
    <BottomSheetWrapper
      className={classnamse(
        closeState ? 'close-bottom-sheet' : 'open-bottom-sheet',
      )}
      onClick={onClickOutSide}
    >
      <ContentsWrapper
        className={classnamse(
          closeState ? 'close-bottom-sheet' : 'open-bottom-sheet',
        )}
        onClick={e => e.stopPropagation()}
      >
        <InfoTextWrapper>
          <TitleWrapper>
            <InfoTitle> {BOTTOM_SHEET.TITLE}</InfoTitle>
            <IconImg src={closeBtn} onClick={closeHandler} />
          </TitleWrapper>
          {BOTTOM_SHEET.SUB_TITLE.map((el, idx) => (
            <DescriptionItem
              className="bottom-sheet__description"
              key={idx.toString()}
              text={el}
            />
          ))}
        </InfoTextWrapper>

        <JoinBtn onClick={onClickJoinHandler}>{BOTTOM_SHEET.JOIN}</JoinBtn>
      </ContentsWrapper>
    </BottomSheetWrapper>
  );
}

export default BottomSheet;
