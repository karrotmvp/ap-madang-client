import React, { useCallback, useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';
import { MeetingDetail } from 'meeting';
import { useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { getAgoraCode } from '../../api/agora';
import { deleteAlarm, newAlarm } from '../../api/alarm';
import { getMeetingDetail } from '../../api/meeting';
import { analytics } from '../../App';
import heart_emoji from '../../assets/icon/agora/heart_emoji.svg';
import mic_emoji from '../../assets/icon/agora/mic_emoji.svg';
import talk_emoji from '../../assets/icon/agora/talk_emoji.svg';
import x_emoji from '../../assets/icon/agora/x_emoji.svg';
import camera_meeting_tag__gray from '../../assets/icon/detailPage/camera_meeting_tag__gray.svg';
import clock from '../../assets/icon/detailPage/clock.svg';
import info_circle from '../../assets/icon/detailPage/info_circle.svg';
import voice_meeting_tag__gray from '../../assets/icon/detailPage/voice_meeting_tag__gray.svg';
import person from '../../assets/icon/person.svg';
import { COLOR } from '../../constant/color';
import { MEETING_DETAIL } from '../../constant/message';
import useInterval from '../../hook/useInterval';
import { userInfoAtom } from '../../store/user';
import { getDateToText, getRemainTime } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import DeleteAlarmModal from '../common/Modal/DeleteAlarmModal';
import MeetingMannerModal from '../common/Modal/MeetingMannerModal';
import NewAlarmModal from '../common/Modal/NewAlarmModal';
import AudioMeetBottomSheet from './components/AudioMeetBottomSheet';
import DescriptionList from './components/DescriptionList';
import Footer from './components/Footer';
import ZoomBottomSheet from './components/ZoomBottomSheet';

interface MatchParams {
  id: string;
}

const MeetingDetailPage = () => {
  const [data, setData] = useState<MeetingDetail | undefined>(undefined);
  const [remainTime, setRemainTime] = useState('');
  const [modal, setModal] = useState<React.ReactElement | undefined>(undefined);
  const [sendLogEvent, setSendLogEvent] = useState(false);
  const { isRoot, isTop } = useCurrentScreen();
  const { pop, replace } = useNavigator();

  const userInfo = useRecoilValue(userInfoAtom);

  const hideModal = () => {
    setModal(undefined);
  };

  const matchId = useRouteMatch<MatchParams>({
    path: '/meetings/:id',
  }) || { params: { id: '' } };

  // 모임 상세정보 fetch
  const fetchData = useCallback(
    async (id: string) => {
      const result = await getMeetingDetail(id);
      if (result.success && result.data) setData(result.data);
      else {
        alert('해당 모임을 찾을 수 없습니다.\n홈에서 다시 시도해주세요');
        if (isRoot) replace('/');
        else pop();
      }
    },
    [isRoot, pop, replace],
  );

  // 알람 신청 핸들러
  const addAlarmHandler = useCallback(async () => {
    if (!userInfo || !data) return;
    logEvent(analytics, 'add_alarm__click', {
      location: 'detail_page',
      meeting_id: data?.id,
      meeting_name: data?.title,
      is_current: data?.live_status,
      userNickname: userInfo.nickname,
      userRegion: userInfo.region,
    });
    const result = await newAlarm(matchId.params.id);
    if (result.success && result.data?.id) {
      setData((prevState: MeetingDetail) => {
        if (prevState)
          return {
            ...prevState,
            alarm_id: result.data?.id,
            alarm_num: prevState.alarm_num + 1,
          };
        return prevState;
      });
      setModal(<NewAlarmModal open={true} closeHandler={hideModal} />);
    }
  }, [data, matchId.params.id, userInfo]);

  // 알람 신청 해제 핸들러
  const deleteAlarmHandler = useCallback(async () => {
    if (data?.alarm_id && matchId?.params.id && userInfo) {
      logEvent(analytics, 'delete_alarm__click', {
        location: 'detail_page',
        meeting_id: data?.id,
        meeting_name: data?.title,
        is_current: data?.live_status,
        userNickname: userInfo.nickname,
        userRegion: userInfo.region,
      });
      const result = await deleteAlarm(data?.alarm_id.toString());
      if (result.success) {
        setData((prevState: MeetingDetail) => {
          if (prevState)
            return {
              ...prevState,
              alarm_id: undefined,
              alarm_num: prevState.alarm_num - 1,
            };
          return prevState;
        });
        return true;
      }
    }
    return false;
  }, [data, matchId.params.id, userInfo]);

  // 알람 신청 핸들러
  const alarmHandler = useCallback(async () => {
    if (data?.alarm_id) {
      setModal(
        <DeleteAlarmModal
          open={true}
          closeHandler={hideModal}
          deleteAlarmHandler={deleteAlarmHandler}
        />,
      );
    } else if (matchId?.params.id) {
      addAlarmHandler();
    }
  }, [addAlarmHandler, data, deleteAlarmHandler, matchId.params.id]);

  // 모임 참여 버튼 핸들러
  const onClickJoinHandler = async () => {
    if (!data && !userInfo) return;
    logEvent(analytics, 'join__click', {
      meeting_id: data?.id,
      meeting_name: data?.title,
      is_current: data?.live_status,
      userNickname: userInfo?.nickname,
      userRegion: userInfo?.region,
    });
    const result = await getAgoraCode(data?.id);
    if (result.success && result.data)
      setModal(
        data?.is_video ? (
          <ZoomBottomSheet
            url={data?.meeting_url}
            onClose={hideModal}
            meetingId={data?.id}
            meetingTitle={data?.title}
          />
        ) : (
          <AudioMeetBottomSheet
            code={result.data?.code}
            url={data?.meeting_url}
            onClose={hideModal}
            meetingId={data?.id}
            meetingTitle={data?.title}
          />
        ),
      );
  };

  // 모임 매너 카드 핸들러
  const onClickMannerCardHandler = () => {
    setModal(<MeetingMannerModal open={true} closeHandler={hideModal} />);
    logEvent(analytics, 'guide_modal__show', {
      location: 'detail_page',
      meeting_id: data?.id,
      meeting_name: data?.title,
      is_current: data?.live_status,
      userNickname: userInfo?.nickname,
      userRegion: userInfo?.region,
    });
  };

  // 하단 남은시간 타이머 업데이트
  useInterval(
    () => {
      setRemainTime(getRemainTime(data?.start_time, data?.date));
    },
    data?.live_status === 'upcoming' ? 10000 : null,
  );

  useEffect(() => {
    if (matchId?.params.id && !data) fetchData(matchId.params.id);
  }, [data, fetchData, matchId.params.id]);

  useEffect(() => {
    if (data) setRemainTime(getRemainTime(data.start_time, data.date));
  }, [data]);

  useEffect(() => {
    data &&
      logEvent(analytics, 'detail_page__show', {
        meeting_id: data?.id,
        meeting_name: data?.title,
        is_current: data?.live_status,
        userNickname: userInfo?.nickname,
        userRegion: userInfo?.region,
      });
  }, [data, userInfo]);

  useEffect(() => {
    if (isRoot && data && !sendLogEvent && userInfo) {
      logEvent(analytics, 'user_from_alarm__show', {
        location: 'detail_page',
        meeting_id: data.id,
        meeting_name: data.title,
        is_current: data.live_status,
        userNickname: userInfo.nickname,
        userRegion: userInfo.region,
      });
      setSendLogEvent(true);
    }
  }, [data, isRoot, sendLogEvent, userInfo]);

  // 페이지 트랜지션이 있을때 떠있는 모달 제거
  useEffect(() => {
    hideModal();
  }, [isTop]);

  return (
    <PageWrapper className="meeting-detail">
      <CustomScreenHelmet />
      {modal}
      <ContentsWrapper className="meeting-detail__contents">
        <BannerWrapper>
          <BannerImg src={data?.image} />
        </BannerWrapper>
        <TagWrapper>
          {data?.is_video ? (
            <Tag src={camera_meeting_tag__gray} />
          ) : (
            <Tag src={voice_meeting_tag__gray} />
          )}
        </TagWrapper>
        <TitleWrapper className="meeting-detail__header">
          <Title className="title1">{data?.title}</Title>
        </TitleWrapper>
        <LineDivider size="0.1rem" color={COLOR.GRAY_200} />
        <SummaryWrapper>
          <SummaryInfo className="summary-info">
            <SummaryIcon src={clock} />
            <SummaryDiscription className="body4">
              {data &&
                `${getDateToText(data?.start_time)} ~ ${getDateToText(
                  data?.end_time,
                )}`}
            </SummaryDiscription>
          </SummaryInfo>
          {data?.live_status === 'live' && (
            <SummaryInfo className="summary-info">
              <SummaryIcon src={person} />
              <SummaryDiscription className="body4">
                누적 참여자 {data?.user_enter_cnt}명
              </SummaryDiscription>
            </SummaryInfo>
          )}
          <SummaryInfo className="summary-info">
            <SummaryIcon src={info_circle} />
            <SummaryDiscription className="body4">
              {data?.is_video
                ? '이 모임은 줌(zoom)으로 진행돼요. 카메라를 켜지 않아도 괜찮아요!'
                : '이 모임에서는 음성으로 이웃과 실시간 대화를 나눠요.'}
            </SummaryDiscription>
          </SummaryInfo>
        </SummaryWrapper>
        <LineDivider size="1.2rem" />

        <UserDiscriptionWrapper>
          <UserDiscriptionTitle>모임 상세 설명</UserDiscriptionTitle>
          {data?.description.text}
        </UserDiscriptionWrapper>

        <LineDivider size="0.1rem" />

        <DescriptionWrapper className="meeting-detail__body">
          <DescriptionList
            title={MEETING_DETAIL.DESCRIPTION_TITLE1}
            data={data?.description.recommend_user}
          />
          <DescriptionList
            title={MEETING_DETAIL.DESCRIPTION_TITLE2}
            data={data?.description.recommend_topic}
          />
        </DescriptionWrapper>
        <LineDivider size="1.2rem" />
        <MeetingMannerCardWrapper
          className="meeting-detail__footer-banner"
          onClick={onClickMannerCardHandler}
        >
          <MannerTitle>{MEETING_DETAIL.MANNER.TITLE}</MannerTitle>

          <MannerItem>
            <MannerEmoji src={heart_emoji} />
            <MannerItemTitle>서로 배려하고 존중해요.</MannerItemTitle>
          </MannerItem>
          <MannerItem>
            <MannerEmoji src={talk_emoji} />
            <MannerItemTitle>
              이웃 모두가 함께 나눌 수 있는 대화를 해요.
            </MannerItemTitle>
          </MannerItem>
          <MannerItem>
            <MannerEmoji src={x_emoji} />
            <MannerItemTitle>
              이웃을 공개적으로 비방하지 않아요.
            </MannerItemTitle>
          </MannerItem>
          <MannerItem>
            <MannerEmoji src={mic_emoji} />
            <MannerItemTitle>
              마이크를 켜라고 강요하지 않기로 해요.
            </MannerItemTitle>
          </MannerItem>
        </MeetingMannerCardWrapper>
      </ContentsWrapper>
      <Footer
        data={data}
        alarmHandler={alarmHandler}
        onClickJoinHandler={onClickJoinHandler}
        remainTime={remainTime}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 16.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const BannerImg = styled.img`
  width: 100%;
  height: auto;
`;

const TagWrapper = styled.div`
  margin: 1.6rem 0 0.8rem 1.6rem;
`;

const Tag = styled.img``;

const LineDivider = styled.div<{ size?: string; color?: string }>`
  border-bottom: ${({ size, color }) =>
    size
      ? `${size} solid ${color || COLOR.GRAY_100}`
      : `1px solid ${color || COLOR.GRAY_100}`};
`;

const ContentsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 4rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8rem 1.6rem 2.4rem 1.6rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
`;

const SummaryWrapper = styled.div`
  margin: 2rem 1.6rem 3rem 1.6rem;

  .summary-info:last-child {
    margin-bottom: 0;
  }
`;

const SummaryInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 1.2rem;
`;

const SummaryIcon = styled.img`
  margin: 0.25rem;
`;

const SummaryDiscription = styled.div`
  color: ${COLOR.TEXT_GRAY};
  margin-left: 0.4rem;
  letter-spacing: -0.03rem;
`;

const UserDiscriptionWrapper = styled.div`
  margin: 3.6rem 1.6rem 2.4rem 1.6rem;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: #505050;
`;

const UserDiscriptionTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  margin-bottom: 1.6rem;
  color: ${COLOR.TEXT_BLACK};
`;

const DescriptionWrapper = styled.div`
  padding: 3.2rem 1.6rem 1.4rem 1.6rem;
`;

const MeetingMannerCardWrapper = styled.div`
  margin: 3.6rem 1.6rem 0 1.6rem;
`;

const MannerTitle = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: -0.04rem;
  margin-bottom: 2.4rem;
`;

const MannerItemTitle = styled.div`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: #505050;
  margin-bottom: 1rem;
`;

const MannerItem = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 1.5rem;
  line-height: 2.3rem;

  letter-spacing: -0.03rem;

  color: #505050;
`;

const MannerEmoji = styled.img`
  margin-right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
`;

export default MeetingDetailPage;
