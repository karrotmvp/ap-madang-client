import React, { Suspense, useCallback } from 'react';

import { shareMeeting } from '@api/meeting';
import share_meeting from '@assets/icon/detailPage/share_meeting.svg';
import PrimaryButton from '@components/common/PrimaryButton';
import styled from '@emotion/styled';
import { meetingDetailSelector } from '@store/meeting';
import mini from '@util/mini';
import { MeetingList } from 'meeting-v2';
import { useRecoilValue } from 'recoil';

import Spacing from '../Spacing';
import JoinButton, { SpinnerButton } from './JoinButton';

type Props = { closeHandler: () => void };

function ButtonGroup({ closeHandler }: Props) {
  const detailMeeting = useRecoilValue(meetingDetailSelector) as MeetingList;

  const shareMeetingHandler = useCallback(async () => {
    // TODO : Share link 확인
    const result = await shareMeeting(detailMeeting.id.toString());
    if (result.success && result.data) {
      mini.share({
        url: result.data.short_url,
        text: '[랜동모] ' + detailMeeting.title,
      });
    }
  }, [detailMeeting]);

  //TODO: share btn 이미지 교체
  return (
    <Wrapper>
      <ShareButton onClick={shareMeetingHandler}>
        <img src={share_meeting} />
      </ShareButton>
      <Spacing width="1.2rem" />
      <Suspense fallback={<SpinnerButton />}>
        <JoinButton closeHandler={closeHandler} />
      </Suspense>
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
