import React, { ReactElement, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';

import { analytics } from '../../App';
import btn404 from '../../assets/icon/btn404.svg';
import not_fount_404 from '../../assets/image/not_found_404.png';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

function NotFoundPage(): ReactElement {
  const { replace } = useNavigator();

  const onClickBackHandler = useCallback(() => {
    replace('/');
  }, [replace]);

  useEffect(() => {
    logEvent(analytics, 'not_found_page__show');
  }, []);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <>
        <NotFoundImg src={not_fount_404} />
        <NotFountBtn src={btn404} onClick={onClickBackHandler} />
      </>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundImg = styled.img`
  width: auto;
  height: 17.4rem;
  margin-bottom: 2rem;
`;
const NotFountBtn = styled.img``;

export default NotFoundPage;
