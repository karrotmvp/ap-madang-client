import React, { Suspense, useCallback, useState } from 'react';

import BottomSheet from '@components/common/BottomSheet';
import CircularProgress from '@components/common/Spinner/Circular-progress';
import styled from '@emotion/styled';
import { meetingDetailSelector } from '@store/meeting';
import { useRecoilValue } from 'recoil';

import useMeetingDetail from '../../hook/useMeetingDetail';
import Spacing from '../Spacing';
import ButtonGroup from './ButtonGroup';
import Contents from './Contents';
import Header from './Header';

function DetailSheet() {
  const { closeMeetingDetail } = useMeetingDetail();
  const [closeState, setCloseState] = useState(false);

  const meetingDetail = useRecoilValue(meetingDetailSelector);

  const closeHandler = useCallback(() => {
    setCloseState(true);

    setTimeout(() => {
      closeMeetingDetail();
      setCloseState(false);
    }, 200);
  }, [closeMeetingDetail]);

  const onClickOutSide = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e?.preventDefault();
    closeHandler();
  };

  return meetingDetail ? (
    <BottomSheet open={closeState} onClose={onClickOutSide}>
      <Wrapper>
        <ContentsWrapper>
          <Header
            is_video={meetingDetail.is_video}
            hostNickname={meetingDetail.host.nickname}
            closeHandler={closeHandler}
          />
          <Contents />
        </ContentsWrapper>
        <Spacing height="2.4rem" />
        <Suspense fallback={<FallbackSpinner />}>
          <ButtonGroup closeHandler={closeHandler} />
        </Suspense>
      </Wrapper>
    </BottomSheet>
  ) : null;
}

const FallbackSpinner = () => {
  return (
    <SpinnerWrapper>
      <CircularProgress />
    </SpinnerWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.4rem 1.6rem 1.6rem 1.6rem;
  box-sizing: border-box;
`;

const ContentsWrapper = styled.div``;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default DetailSheet;
