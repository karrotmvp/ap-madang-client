import React, { useCallback, useEffect, useState } from 'react';

import BottomSheet from '@components/common/BottomSheet';
import styled from '@emotion/styled';
import { detailMeetingIdAtom, meetingDetailSelector } from '@store/meeting';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useToast } from '../../../../lib/Toast/util';
import useMeetingDetail from '../../hook/useMeetingDetail';
import Spacing from '../Spacing';
import ButtonGroup from './ButtonGroup';
import Contents from './Contents';
import Header from './Header';

function DetailSheet() {
  const { closeMeetingDetail } = useMeetingDetail();
  const [closeState, setCloseState] = useState(false);
  const { openToast } = useToast();
  const [detailMeetingId, setDetailMeetingId] =
    useRecoilState(detailMeetingIdAtom);
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

  useEffect(() => {
    if (!meetingDetail && detailMeetingId) {
      openToast({ content: '종료된 모임이에요.' });
      setDetailMeetingId(undefined);
    }
  }, [detailMeetingId, meetingDetail, openToast, setDetailMeetingId]);

  return meetingDetail ? (
    <BottomSheet open={closeState} onClose={onClickOutSide}>
      <Wrapper>
        <ContentsWrapper>
          <Header
            is_video={meetingDetail.is_video}
            closeHandler={closeHandler}
          />
          <Contents />
        </ContentsWrapper>
        <Spacing height="2.4rem" />

        <ButtonGroup closeHandler={closeHandler} />
      </Wrapper>
    </BottomSheet>
  ) : null;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.4rem 1.6rem 1.6rem 1.6rem;
  box-sizing: border-box;
`;

const ContentsWrapper = styled.div``;

export default DetailSheet;
