import React, { ReactElement, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { useCurrentScreen } from '@karrotframe/navigator';
import { MeetingList as MeetingListType } from 'meeting';
import { useRecoilValue } from 'recoil';

import { getMyMeetings } from '../../api/meeting';
import { MY_PAGE } from '../../constant/message';
import { userInfoAtom } from '../../store/user';
import { COLOR } from '../../style/color';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import Divider from '../common/Divider';
import EmptyMeeting from './components/EmptyMeeting';
import MyMeetingList from './components/MyMeetingList';

function MyPage(): ReactElement {
  const [meetings, setMeetings] = useState<MeetingListType[]>([]);
  const userInfo = useRecoilValue(userInfoAtom);
  const { isTop } = useCurrentScreen();

  const fetchMeetings = async () => {
    const result = await getMyMeetings();
    if (result.success && result.data) {
      const arr = ['live', 'today', 'tomorrow', 'upcoming', 'finish'];
      setMeetings(
        result.data.sort((a, b) => {
          if (arr.indexOf(a.live_status) === arr.indexOf(b.live_status)) {
            if (a.live_status === 'finish') {
              if (a.date === b.date)
                return a.start_time > b.start_time ? -1 : 1;
              return a.date > b.date ? -1 : 1;
            }
            if (a.date === b.date) return a.start_time < b.start_time ? -1 : 1;
            return a.date < b.date ? -1 : 1;
          }
          return arr.indexOf(a.live_status) - arr.indexOf(b.live_status);
        }),
      );
    }
  };

  useEffect(() => {
    isTop && fetchMeetings();
  }, [isTop]);

  return (
    <MyPageWrapper>
      <CustomScreenHelmet
        appendMiddle={<PageTitle>{MY_PAGE.NAVIGATOR_TITLE}</PageTitle>}
      />
      <UserProfileWrapper>
        <ProofileImg src={userInfo?.profile_image_url} />
        <InfoWrapper>
          <UserNickname>{userInfo?.nickname}</UserNickname>
          <UserRegion>{userInfo?.region}</UserRegion>
        </InfoWrapper>
      </UserProfileWrapper>
      <Divider size="1rem" />
      {meetings.length !== 0 ? (
        <MyMeetingList
          className="my__meeting"
          title="?????? ?????? ??????"
          meetings={meetings}
        />
      ) : (
        <EmptyMeeting />
      )}
    </MyPageWrapper>
  );
}

const MyPageWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03em;
  box-sizing: border-box;
`;

const UserProfileWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProofileImg = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
`;

const InfoWrapper = styled.div`
  margin-left: 1.6rem;
`;
const UserNickname = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-bottom: 0.2rem;
`;

const UserRegion = styled.div`
  font-size: 1.4rem;
  line-height: 2.1rem;
  color: ${COLOR.TEXT_GREY};
`;

export default MyPage;
