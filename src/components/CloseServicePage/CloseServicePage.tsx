import React, { useCallback } from 'react';

import styled from '@emotion/styled';
import mini from '@util/mini';
import { getQueryString } from '@util/utils';

import PrimaryButton from '../common/PrimaryButton';
import Spacing from '../Home/components/Spacing';

function CloseServicePage() {
  const goBackHandler = useCallback(() => {
    const withScheme = getQueryString(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'scheme',
    );
    if (!withScheme) mini.close();
  }, []);

  return (
    <Page>
      <Title>
        <EmphasisTitle>랜선동네모임</EmphasisTitle> 베타서비스가 종료되었어요.
      </Title>
      <Spacing height="2.4rem" />
      <Text>
        그동안 관심을 가지고 랜선동네모임을 이용해주신 여러분께 감사드려요.
        앞으로 들어올 새로운 서비스를 기대해주세요!
      </Text>
      <Spacing height="3.2rem" />
      <Button onClick={goBackHandler}>당근마켓으로 돌아가기</Button>
    </Page>
  );
}

const Page = styled.div`
  height: 100%;
  padding: 0 2.4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-family: 'HGSoftGGothicssi_Pro_80g';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 120%;

  text-align: center;
  letter-spacing: -0.02em;
  word-break: keep-all;

  color: ${({ theme }) => theme.colors.$gray700};
`;

const EmphasisTitle = styled(Title)`
  color: #fe8745;
`;

const Text = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.2rem;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02rem;

  color: ${({ theme }) => theme.colors.$gray700};
  word-break: keep-all;
`;

const Button = styled(PrimaryButton)`
  padding: 0.9rem 1.6rem;
  width: auto;
`;
export default CloseServicePage;
