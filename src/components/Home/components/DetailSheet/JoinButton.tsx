import React, { useCallback } from 'react';

import PrimaryButton from '@components/common/PrimaryButton';
import CircularProgress from '@components/common/Spinner/Circular-progress';
import styled from '@emotion/styled';
import useMini from '@hook/useMini';
import { codeSelector, meetingDetailSelector } from '@store/meeting';
import { MeetingList } from 'meeting-v2';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

type Props = { closeHandler: () => void };

function JoinButton({ closeHandler }: Props) {
  const { loginWithMini } = useMini();
  const code = useRecoilValue(codeSelector);
  const codeRefresh = useRecoilRefresher_UNSTABLE(codeSelector);
  const detailMeeting = useRecoilValue(meetingDetailSelector) as MeetingList;

  const onClickJoinHandler = useCallback(async () => {
    if (detailMeeting.is_video) {
      return window.open(detailMeeting.meeting_url);
    }
    const windowReference = window.open(
      `/#/agora?meeting_code=${code}`,
      '_blank',
    );
    windowReference;

    codeRefresh();
    closeHandler();
    return;
  }, [
    closeHandler,
    code,
    codeRefresh,
    detailMeeting.is_video,
    detailMeeting.meeting_url,
  ]);

  return (
    <Button onClick={() => loginWithMini(onClickJoinHandler)}>참여하기</Button>
  );
}

export function SpinnerButton() {
  return (
    <Button>
      <CircularProgress color={'#ffffff'} />
    </Button>
  );
}

const Button = styled(PrimaryButton)`
  width: auto;
  padding: 1.2rem 1.6rem;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.02rem;
  flex: 1;
  box-sizing: border-box;
  border: none;
`;
export default JoinButton;
