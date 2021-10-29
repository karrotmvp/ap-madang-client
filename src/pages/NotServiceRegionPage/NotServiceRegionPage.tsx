import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useRecoilValue } from 'recoil';

import { analytics } from '../../App';
import scratching from '../../assets/image/scratching.png';
import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';
import { COLOR } from '../../constant/color';
import { userInfoAtom } from '../../store/user';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotServiceImg = styled.img`
  width: 8rem;
  height: 7.4rem;
  margin-bottom: 1.2rem;
`;

const Text = styled.span`
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3.3rem;
  text-align: center;
  letter-spacing: -0.04rem;
`;

const BoldText = styled(Text)`
  color: ${COLOR.LIGHT_GREEN};
`;

function NotServiceRegionPage(): ReactElement {
  const userInfo = useRecoilValue(userInfoAtom);

  useEffect(() => {
    logEvent(analytics, 'not_service_region_page', {
      region: userInfo?.region,
    });
  }, [userInfo]);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <NotServiceImg src={scratching} />
      <Text>
        <BoldText>{userInfo?.region}</BoldText>의 랜선동네모임은
        <br />
        오픈 준비 중이에요.
      </Text>
    </PageWrapper>
  );
}

export default NotServiceRegionPage;
