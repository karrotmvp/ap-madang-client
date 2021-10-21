import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';

import nav_back from '../../assets/icon/nav_back.svg';

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
const NotFountNum = styled.div`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
`;

const NotFoundText = styled.div`
  font-size: 2rem;
  margin-bottom: 5rem;
`;
const BackBtn = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;

function NotFoundPage(): ReactElement {
  const { pop } = useNavigator();

  const onClickBackHandler = useCallback(() => {
    pop();
  }, [pop]);

  return (
    <PageWrapper>
      <ScreenHelmet customBackButton={<NavCustomBtn src={nav_back} />} />
      <NotFountNum>404</NotFountNum>
      <NotFoundText>알 수 없는 오류가 발생했어요.</NotFoundText>
      <BackBtn onClick={onClickBackHandler}>뒤로 돌아가기</BackBtn>
    </PageWrapper>
  );
}

export default NotFoundPage;
