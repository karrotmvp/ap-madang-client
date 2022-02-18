import React, { useCallback } from 'react';

import { shareMeeting } from '@api/meeting';
import share_meeting from '@assets/icon/detailPage/share_meeting.svg';
import PrimaryButton from '@components/common/PrimaryButton';
import styled from '@emotion/styled';
import useMini from '@hook/useMini';
import { codeSelector, meetingDetailSelector } from '@store/meeting';
import mini from '@util/mini';
import { MeetingList } from 'meeting-v2';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

import Spacing from '../Spacing';

type Props = { closeHandler: () => void };

function ButtonGroup({ closeHandler }: Props) {
  const { loginWithMini } = useMini();
  const code = useRecoilValue(codeSelector);
  const codeRefresh = useRecoilRefresher_UNSTABLE(codeSelector);
  const detailMeeting = useRecoilValue(meetingDetailSelector) as MeetingList;

  const onClickJoinHandler = useCallback(async () => {
    if (detailMeeting.is_video) {
      return window.open(detailMeeting.meeting_url);
    }
    //TODO: 로컬 url 변경
    const windowReference = window.open(
      `http://localhost:3000/#/agora?meeting_code=${code}`,
      '_blank',
    );
    windowReference;

    codeRefresh();
    closeHandler();
    return;
  }, [closeHandler, code, codeRefresh, detailMeeting]);

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
      <JoinButton onClick={() => loginWithMini(onClickJoinHandler)}>
        참여하기
      </JoinButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const JoinButton = styled(PrimaryButton)`
  width: auto;
  padding: 1.2rem 1.6rem;
  font-size: 1.8rem;
  line-height: 2.4rem;
  letter-spacing: -0.02rem;
  flex: 1;
  box-sizing: border-box;
  border: none;
`;

const ShareButton = styled(PrimaryButton)`
  width: 5.6rem;
  background: white;
  color: black;
  border: 1px solid #dcdee3;
  box-sizing: border-box;
`;

export default ButtonGroup;
