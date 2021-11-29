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
import back_arrow_green from '../../assets/icon/detailPage/back_arrow_green.svg';
import camera_meeting_tag__gray from '../../assets/icon/detailPage/camera_meeting_tag__gray.svg';
import clock from '../../assets/icon/detailPage/clock.svg';
import info_circle from '../../assets/icon/detailPage/info_circle.svg';
import voice_meeting_tag__gray from '../../assets/icon/detailPage/voice_meeting_tag__gray.svg';
import person from '../../assets/icon/person.svg';
import nav_logo from '../../assets/image/nav_logo.png';
import { COLOR } from '../../constant/color';
import { MEETING_DETAIL } from '../../constant/message';
import useInterval from '../../hook/useInterval';
import { userInfoAtom, UserInfoType } from '../../store/user';
import { getDateToText, getRemainTime } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import DeleteAlarmModal from '../common/Modal/DeleteAlarmModal';
import NewAlarmModal from '../common/Modal/NewAlarmModal';
import AlarmFooter from './components/AlarmFooter';
import AudioMeetBottomSheet from './components/AudioMeetBottomSheet';
import DescriptionList from './components/DescriptionList';
import Footer from './components/Footer';
import MeetingMannerCard from './components/MannerCard';
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
        alert('이미 종료된 모임이에요');
        if (isRoot) replace('/');
        else pop();
      }
    },
    [isRoot, pop, replace],
  );

  // 알람 신청 핸들러
  const addAlarmHandler = useCallback(
    async userInfo => {
      if (!userInfo || !data) return;
      logEvent(analytics, 'add_alarm__click', {
        location: 'detail_page',
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
    },
    [data, matchId.params.id],
  );

  // 알람 신청 해제 핸들러
  const deleteAlarmHandler = useCallback(async () => {
    if (data?.alarm_id && matchId?.params.id && userInfo) {
      logEvent(analytics, 'delete_alarm__click', {
        location: 'detail_page',
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
  const alarmHandler = useCallback(
    (userInfo: UserInfoType) => async (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (data?.alarm_id) {
        setModal(
          <DeleteAlarmModal
            open={true}
            closeHandler={hideModal}
            deleteAlarmHandler={deleteAlarmHandler}
          />,
        );
      } else if (matchId?.params.id) {
        addAlarmHandler(userInfo);
      }
    },
    [addAlarmHandler, data, deleteAlarmHandler, matchId.params.id],
  );

  // 모임 참여 버튼 핸들러
  const onClickJoinHandler =
    (userInfo: UserInfoType) => async (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!data && !userInfo) return;
      logEvent(analytics, 'join__click', {
        userNickname: userInfo?.nickname || 'GUEST',
        userRegion: userInfo?.region || 'GUEST',
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
    if (isRoot && data && !sendLogEvent && userInfo) {
      logEvent(analytics, 'user_from_alarm__show', {
        location: 'detail_page',
        userNickname: userInfo?.nickname || 'GUEST',
        userRegion: userInfo?.region || 'GUEST',
      });
      setSendLogEvent(true);
    } else if (data && !sendLogEvent && userInfo) {
      logEvent(analytics, 'detail_page__show', {
        userNickname: userInfo?.nickname || 'GUEST',
        userRegion: userInfo?.region || 'GUEST',
      });
      setSendLogEvent(true);
    }
  }, [data, isRoot, sendLogEvent, userInfo]);

  // 페이지 트랜지션이 있을때 떠있는 모달 제거
  useEffect(() => {
    hideModal();
  }, [isTop, userInfo]);

  return (
    <PageWrapper className="meeting-detail">
      <CustomScreenHelmet
        appendLeft={
          isRoot && <PageTitle onClick={() => replace('/')} src={nav_logo} />
        }
      />
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
        <Divider size="0.1rem" color={COLOR.GREY_200} />
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
                ? MEETING_DETAIL.IS_VIDEO
                : MEETING_DETAIL.IS_VOICE}
            </SummaryDiscription>
          </SummaryInfo>
        </SummaryWrapper>
        <Divider size="1.2rem" />

        <UserDiscriptionWrapper>
          <UserDiscriptionTitle>
            {MEETING_DETAIL.MEETING_DETAIL_DESCRIPTION_TITLE}
          </UserDiscriptionTitle>
          {data?.description.text}
        </UserDiscriptionWrapper>
        <Divider size="0.1rem" />

        <DescriptionWrapper className="meeting-detail__body">
          <DescriptionList
            title={MEETING_DETAIL.DESCRIPTION_TITLE1}
            data={data?.description.recommend_user}
          />
          <DescriptionList
            title={MEETING_DETAIL.DESCRIPTION_TITLE2}
            data={data?.description.recommend_topic}
          />
          {data?.live_status !== 'live' && isRoot && (
            <GoHomeBtn onClick={() => replace('/')}>
              <BackArrowIcon src={back_arrow_green} />
              <GoHomeText>다른 모임 보러가기</GoHomeText>
            </GoHomeBtn>
          )}
        </DescriptionWrapper>
        <Divider size="1.2rem" />
        <MeetingMannerCard className="meeting-detail__manner-card" />
      </ContentsWrapper>
      {data?.live_status !== 'live' ? (
        <AlarmFooter data={data} alarmHandler={alarmHandler} />
      ) : (
        <Footer
          data={data}
          onClickJoinHandler={onClickJoinHandler}
          remainTime={remainTime}
        />
      )}
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

const PageTitle = styled.img`
  margin-left: 3.2rem;
  height: 33%;
  width: auto;
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

const ContentsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 3rem;
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
  color: ${COLOR.TEXT_GREY};
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

const GoHomeBtn = styled.div`
  padding: 1rem;
  border: 1px solid ${COLOR.LIGHT_GREEN};
  border-radius: 0.6rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BackArrowIcon = styled.img`
  margin-right: 0.2rem;
`;

const GoHomeText = styled.div`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.LIGHT_GREEN};
`;

export default MeetingDetailPage;
