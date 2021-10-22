import React, { ReactElement, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';

import { analytics } from '../../App';
import btn404 from '../../assets/icon/btn404.svg';
import nav_back from '../../assets/icon/nav_back.svg';
import nav_close from '../../assets/icon/nav_close.svg';
import not_fount_404 from '../../assets/image/not_found_404.png';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavCustomBtn = styled.img`
  margin-left: 1.5rem;
`;
const NotFoundImg = styled.img`
  width: auto;
  height: 17.4rem;
  margin-bottom: 2rem;
`;
const NotFountBtn = styled.img``;

function NotFoundPage(): ReactElement {
  const { replace } = useNavigator();

  const onClickBackHandler = useCallback(() => {
    replace('/');
  }, [replace]);

  useEffect(() => {
    logEvent(analytics, 'not_found_page');
  }, []);

  return (
    <PageWrapper>
      <ScreenHelmet
        customCloseButton={<NavCustomBtn src={nav_close} />}
        customBackButton={<NavCustomBtn src={nav_back} />}
      />
      <>
        <NotFoundImg src={not_fount_404} />
        <NotFountBtn src={btn404} onClick={onClickBackHandler} />
      </>
    </PageWrapper>
  );
}

export default NotFoundPage;
