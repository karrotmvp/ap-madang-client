import React, { Suspense, useCallback } from 'react';

import share_icon from '@assets/icon/home/share_icon.svg';
import PrimaryButton from '@components/common/PrimaryButton';
import styled from '@emotion/styled';
import { meetingDetailSelector } from '@store/meeting';
import mini from '@util/mini';
import { liveStatusType, MeetingList } from 'meeting-v2';
import { useRecoilValue } from 'recoil';

import Spacing from '../Spacing';
import CloseMeetingButton from './CloseMeetingButton';
import JoinButton, { SpinnerButton } from './JoinButton';

type Props = { closeHandler: () => void; live_status: liveStatusType };

function ButtonGroup({ closeHandler, live_status }: Props) {
  const detailMeeting = useRecoilValue(meetingDetailSelector) as MeetingList;

  const shareMeetingHandler = useCallback(async () => {
    mini.share({
      url: `${process.env.CLIENT_URL}/?#/short?share_code=${detailMeeting.share_code}`,
      text: '[랜동모] ' + detailMeeting.title,
    });
  }, [detailMeeting.share_code, detailMeeting.title]);

  return live_status === 'live' ? (
    <Wrapper>
      <ShareButton onClick={shareMeetingHandler}>
        <img src={share_icon} />
      </ShareButton>
      <Spacing width="1.2rem" />
      <Suspense fallback={<SpinnerButton />}>
        <JoinButton closeHandler={closeHandler} />
      </Suspense>
    </Wrapper>
  ) : (
    <Wrapper>
      <CloseMeetingButton />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ShareButton = styled(PrimaryButton)`
  width: 5.6rem;
  background: white;
  color: black;
  border: 1px solid #dcdee3;
  box-sizing: border-box;
`;

export default ButtonGroup;
