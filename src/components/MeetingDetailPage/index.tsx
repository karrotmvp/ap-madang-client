import React, { useCallback, useState, useEffect, useMemo } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';
import dayjs from 'dayjs';
import { MeetingDetail } from 'meeting';
import { useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { getAgoraCode } from '../../api/agora';
import { deleteAlarm, newAlarm } from '../../api/alarm';
import { getMeetingDetail, shareMeeting } from '../../api/meeting';
import { analytics } from '../../App';
import nav_back from '../../assets/icon/common/nav_back.svg';
import back_arrow_green from '../../assets/icon/detailPage/back_arrow_green.svg';
import camera_meeting_tag__gray from '../../assets/icon/detailPage/camera_meeting_tag__gray.svg';
import clock from '../../assets/icon/detailPage/clock.svg';
import info_i from '../../assets/icon/detailPage/info_i.svg';
import neighbor_person from '../../assets/icon/detailPage/neighbor_person.svg';
import share_meeting from '../../assets/icon/detailPage/share_meeting.svg';
import trailing_icon from '../../assets/icon/detailPage/trailing_icon.svg';
import voice_meeting_tag__gray from '../../assets/icon/detailPage/voice_meeting_tag__gray.svg';
import nav_logo from '../../assets/image/nav_logo.png';
import { COLOR } from '../../constant/color';
import { MEETING_DETAIL } from '../../constant/message';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import DeleteAlarmModal from '../common/Modal/DeleteAlarmModal';
import NewAlarmModal from '../common/Modal/NewAlarmModal';
import AudioMeetBottomSheet from './components/AudioMeetBottomSheet';
import AlarmFooter from './components/Footer/AlarmFooter';
import FinishFooter from './components/Footer/FinishFooter';
import Footer from './components/Footer/Footer';
import HostFooter from './components/Footer/HostFooter';
import MeetingMannerCard from './components/MannerCard';
import MoreActionModal from './components/Modal/MoreActionModal';
import UserProfile from './components/UserProfile';
import ZoomBottomSheet from './components/ZoomBottomSheet';

interface MatchParams {
  id: string;
}

const MeetingDetailPage = () => {
  const [data, setData] = useState<MeetingDetail | undefined>(undefined);
  const [modal, setModal] = useState<React.ReactElement | undefined>(undefined);
  const [sendLogEvent, setSendLogEvent] = useState(false);
  const [moreActionState, setMoreActionState] = useState<
    undefined | 'menu' | 'delete'
  >(undefined);
  const { isRoot, isTop } = useCurrentScreen();
  const { pop, replace } = useNavigator();
  const mini = useMini();
  const [showTooltip, setShowTooltip] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);

  const hideModal = () => {
    setModal(undefined);
  };

  const matchId = useRouteMatch<MatchParams>({
    path: '/meetings/:id',
  }) || { params: { id: '' } };

  const params = useMemo(() => {
    const urlHashParams = new URLSearchParams(
      window.location.hash.substr(window.location.hash.indexOf('?')),
    );
    return urlHashParams;
  }, []);

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

        meeting_title: data.title,
        meeting_id: data.id,
        meeting_live_status: data.live_status,
        meeting_is_video: data.is_video,
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

        meeting_title: data.title,
        meeting_id: data.id,
        meeting_live_status: data.live_status,
        meeting_is_video: data.is_video,
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
      addAlarmHandler(userInfo);
    }
  }, [addAlarmHandler, data, deleteAlarmHandler, matchId.params.id, userInfo]);

  // 모임 참여 버튼 핸들러
  const onClickJoinHandler = useCallback(
    async (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!data && !userInfo) return;
      logEvent(analytics, `${data?.is_video ? 'video' : 'audio'}_join__click`);
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
    },
    [data, userInfo],
  );

  const onShareMeetingHandler = async () => {
    logEvent(analytics, `share_meeting_btn__click`, {
      meeting_id: data.id,
      meeting_title: data.title,
      meeting_state: data.live_status,
      is_host: data.is_host,
    });
    const shareUrl = await shareMeeting(matchId.params.id);
    if (shareUrl.success && shareUrl.data && data.title) {
      mini.share(shareUrl.data.short_url, '[랜동모] ' + data.title);
    }
  };

  useEffect(() => {
    if (matchId?.params.id) fetchData(matchId.params.id);
  }, [fetchData, matchId.params.id, userInfo]);

  useEffect(() => {
    if (!data) return;
    const refParam = params?.get('ref');
    if (isRoot && !sendLogEvent && refParam) {
      logEvent(analytics, `user_from_${refParam}__show`, {
        location: 'detail_page',
        meeting_id: data.id,
        meeting_title: data.title,
        meeting_state: data?.live_status,
        isHost: data.isHost,
      });
      setSendLogEvent(true);
    }
  }, [data, isRoot, params, sendLogEvent]);

  // 페이지 트랜지션이 있을때 떠있는 모달 제거
  useEffect(() => {
    hideModal();
    isTop && logEvent(analytics, `detail_page__show`);
  }, [isTop]);

  useEffect(() => {
    if (data) {
      logEvent(
        analytics,
        `${data.is_video ? 'video' : 'audio'}_detail_page__show`,
      );
      const createdParam = params.get('created');
      createdParam &&
        logEvent(analytics, `created_from_${createdParam}__show`, {
          meeting_id: data.id,
          meeting_title: data.title,
        });
    }
  }, [data, params]);

  const popCreatedMeeting = useCallback(() => {
    const urlHashParams = new URLSearchParams(
      location.search.substring(location.search.indexOf('?')),
    );
    if (isRoot) replace('/');
    else {
      if (urlHashParams.get('created') === 'banner') pop(2);
      else pop();
    }
  }, [isRoot, replace, pop]);

  return (
    <PageWrapper className="meeting-detail">
      <CustomScreenHelmet
        customBackButton={
          <NavCustomBtn src={nav_back} onClick={popCreatedMeeting} />
        }
        appendMiddle={
          isRoot && <PageTitle onClick={() => replace('/')} src={nav_logo} />
        }
        appendRight={
          <NavIconSet>
            <ShareIcon src={share_meeting} onClick={onShareMeetingHandler} />
            {data?.is_host && (
              <TrailingIcon
                src={trailing_icon}
                onClick={() => setMoreActionState('menu')}
              />
            )}
          </NavIconSet>
        }
      />

      {moreActionState && data?.is_host && (
        <MoreActionModal
          state={moreActionState}
          setState={setMoreActionState}
          id={matchId.params.id}
        />
      )}
      {modal}
      <ContentsWrapper
        className="meeting-detail__contents"
        bottomPadding={
          data?.live_status !== 'live' && isRoot ? '16rem' : '4rem'
        }
      >
        <BannerWrapper>
          <BannerImg src={data?.image} />
        </BannerWrapper>
        <TagWrapper>
          {showTooltip && (
            <TagMessageBubbleOutside className="tag-tooltip">
              <TagMessageBubble>
                {data?.is_video
                  ? MEETING_DETAIL.IS_VIDEO
                  : MEETING_DETAIL.IS_VOICE}
              </TagMessageBubble>
            </TagMessageBubbleOutside>
          )}
          <TagImageWrapper>
            <Tag
              src={
                data?.is_video
                  ? camera_meeting_tag__gray
                  : voice_meeting_tag__gray
              }
              onClick={() => {
                setShowTooltip(state => !state);
              }}
            />
            <InfoIcon
              src={info_i}
              onClick={() => {
                setShowTooltip(state => !state);
              }}
            />
          </TagImageWrapper>
        </TagWrapper>
        <TitleWrapper className="meeting-detail__header">
          <Title className="title1">{data?.title}</Title>
        </TitleWrapper>
        {data?.host && <UserProfile hostInfo={data.host} />}
        <Divider size="0.1rem" color={COLOR.GREY_200} />
        <SummaryWrapper>
          <SummaryInfo className="summary-info">
            <SummaryIcon src={clock} />
            <SummaryDiscription className="body4">
              {data &&
                `${dayjs(data?.date).format('MM월 DD일 dddd')} ${dayjs(
                  data?.date + data?.start_time,
                ).format('a h:mm')}~${dayjs(data?.date + data?.end_time).format(
                  'a h:mm',
                )} 
                `}
            </SummaryDiscription>
          </SummaryInfo>
          {data?.live_status === 'live' && (
            <SummaryInfo className="summary-info">
              <SummaryIcon src={neighbor_person} />
              <SummaryDiscription className="body4">
                참여 이웃 {data?.user_enter_cnt}명
              </SummaryDiscription>
            </SummaryInfo>
          )}
        </SummaryWrapper>
        <Divider size="1.2rem" />

        <UserDiscriptionWrapper>
          <UserDiscriptionTitle>
            {MEETING_DETAIL.MEETING_DETAIL_DESCRIPTION_TITLE}
          </UserDiscriptionTitle>
          {data?.description.text}
        </UserDiscriptionWrapper>
        <Divider size="0.1rem" />
        {isRoot && (
          <>
            <Divider size="1.2rem" />
            <GoHomeWrapper>
              <GoHomeTitle>다른 모임도 궁금하신가요?</GoHomeTitle>
              <GoHomeBtn
                onClick={() => {
                  logEvent(analytics, 'user_from_feed_go_home__click', {
                    location: 'detail_page',
                  });
                  replace('/');
                }}
              >
                <BackArrowIcon src={back_arrow_green} />
                <GoHomeText>다른 모임 보러가기</GoHomeText>
              </GoHomeBtn>
            </GoHomeWrapper>
          </>
        )}
        <Divider size="1.2rem" />
        <MeetingMannerCard className="meeting-detail__manner-card" />
      </ContentsWrapper>

      {data?.live_status === 'finish' ? (
        <FinishFooter />
      ) : data?.is_host && data?.live_status !== 'live' ? (
        <HostFooter data={data} />
      ) : data?.live_status !== 'live' && data?.live_status !== 'finish' ? (
        <AlarmFooter
          data={data}
          alarmHandler={alarmHandler}
          fromFeed={params.get('ref') === 'feed' ? true : false}
        />
      ) : (
        <Footer onClickJoinHandler={onClickJoinHandler} data={data} />
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
  box-sizing: border-box;
`;

const NavCustomBtn = styled.img`
  margin-left: 1.6rem;
`;

const PageTitle = styled.img`
  height: 1.43rem;
  width: auto;
`;

const NavIconSet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-right: 1.6rem;
`;

const ShareIcon = styled.img``;

const TrailingIcon = styled.img`
  margin-left: 2.4rem;
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
  box-sizing: border-box;
  position: relative;
  margin: 1.6rem 1.6rem 0.8rem 1.6rem;
  display: flex;
  flex-direction: column;
`;

const TagMessageBubbleOutside = styled.div`
  position: relative;
`;

const TagMessageBubble = styled.div`
  position: absolute;
  padding: 0.8rem 1.4rem;
  background: #3ea36a;
  border-radius: 0.6rem;
  bottom: 0.8rem;
  font-size: 1.3rem;
  line-height: 2rem;
  color: ${COLOR.TEXT_WHITE};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 8.1rem;
    width: 0;
    height: 0;
    border: 0.7rem solid transparent;
    border-top-color: #3ea36a;
    border-bottom: 0;
    margin-left: -0.7rem;
    margin-bottom: -0.7rem;
  }
`;

const TagImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Tag = styled.img`
  width: 6.8rem;
`;

const InfoIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 0.4rem;
`;

const ContentsWrapper = styled.div<{ bottomPadding: string }>`
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: ${({ bottomPadding }) => bottomPadding};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.6rem 1.2rem 1.6rem;
`;

const Title = styled.div`
  color: ${COLOR.TEXT_BLACK};
`;

const SummaryWrapper = styled.div`
  margin: 2rem 1.6rem;

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
  color: ${COLOR.TEXT_BLACK};
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

const GoHomeWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
`;

const GoHomeTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  margin-bottom: 1rem;
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
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.LIGHT_GREEN};
`;

export default MeetingDetailPage;
