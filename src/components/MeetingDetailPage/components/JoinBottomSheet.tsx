import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';

import { analytics } from '../../../App';
import closeBtn from '../../../assets/icon/nav_close.svg';
import BottomSheet from '../../../components/common/BottomSheet';
import { BOTTOM_SHEET } from '../../../constant/message';
import DescriptionItem from '../../common/DescriptionItem';

interface Props {
  onClose: () => void;
  onClickJoin?: () => void;
  meetingId?: string;
  meetingTitle?: string;
  url?: string;
}

function JoinBottomSheet({
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
    <BottomSheet
      className="join_bottom_sheet"
      onClose={onClickOutSide}
      open={closeState}
    >
      <InfoTextWrapper>
        <TitleWrapper>
          <InfoTitle> {BOTTOM_SHEET.TITLE}</InfoTitle>
          <IconImg src={closeBtn} onClick={closeHandler} />
        </TitleWrapper>
        {BOTTOM_SHEET.SUB_TITLE.map((el, idx) => (
          <DescriptionItem
            className="join_bottom-sheet__description"
            key={idx.toString()}
            text={el}
          />
        ))}
      </InfoTextWrapper>

      <JoinBtn onClick={onClickJoinHandler}>{BOTTOM_SHEET.JOIN}</JoinBtn>
    </BottomSheet>
  );
}

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

export default JoinBottomSheet;
