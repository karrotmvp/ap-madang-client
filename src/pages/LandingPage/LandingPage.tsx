/** @jsx jsx */
import { ReactElement, useCallback, useEffect, useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';
import { useSetRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

import { getMeetings } from '../../api/meeting';
import { login } from '../../api/user';
import { mini } from '../../App';
import MeetingList from '../../components/MeetingList/MeetingList';
import { LANDING } from '../../constant/message';
import { meetingsAtom } from '../../store/meeting';
import { userInfoAtom } from '../../store/user';
import { getCodefromUrl, getRegionId } from '../../util/utils';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  margin-left: 20px;
`;

const Banner = styled.div`
  box-sizing: border-box;
  width: 100%;

  padding: 20px;
  background-color: #ffdf8b;
  margin-bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

function LandingPage(): ReactElement {
  const cookie = new Cookies();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setMeetings = useSetRecoilState(meetingsAtom);
  const [onBoard] = useState(cookie.get('onboard'));
  const { replace } = useNavigator();

  const userInfoHandler = useCallback(
    async code => {
      const regionId = getRegionId(location.search);
      if (code && regionId) {
        const result = await login({ code, regionId });
        if (!result.success) return;
        if (
          result.data?.token &&
          result.data?.nickname &&
          result.data?.region
        ) {
          cookie.set('Authorization', result.data?.token);
          setUserInfo({
            nickname: result.data.nickname,
            region: result.data.region,
          });
        }
      }
    },
    // eslint-disable-next-line
    [setUserInfo],
  );

  const meetingListHandler = useCallback(async () => {
    const result = await getMeetings();
    console.log(result);
    if (!result.success || !result.data) return;

    if (result.data) setMeetings(result.data);
  }, [setMeetings]);

  const miniPresetHandler = useCallback(() => {
    mini.startPreset({
      preset: process.env.MINI_PRESET_URL || '',
      params: {
        appId: process.env.APP_ID || '',
      },
      async onSuccess(result) {
        if (result && result.code) userInfoHandler(result.code);
      },
    });
  }, [userInfoHandler]);

  useEffect(() => {
    if (!onBoard) {
      replace('/onboarding');
      return;
    }
    const code = getCodefromUrl(location.search);
    console.log('code', code);
    if (code) userInfoHandler(code);
    else miniPresetHandler();
  }, [miniPresetHandler, onBoard, replace, userInfoHandler]);

  useEffect(() => {
    const auth = cookie.get('Authorization');
    if (!auth) return;
    meetingListHandler();
  }, [cookie, meetingListHandler]);

  return (
    <PageWrapper>
      <ScreenHelmet
        appendLeft={<PageTitle>{LANDING.NAVIGATOR_TITLE}</PageTitle>}
      />
      <Banner>{/* TODO: 배너 이미지 삽입*/}랜.동.모 하이~👋</Banner>
      <MeetingList title={LANDING.CURRENT_MEETING} />
      <MeetingList title={LANDING.UPCOMING_MEETING} />
      {/* <MeetingList title={LANDING.TOMORROW_MEETING} /> */}
    </PageWrapper>
  );
}

export default LandingPage;
