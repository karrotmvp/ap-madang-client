import React, { ReactElement, useEffect } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import {
  ScreenHelmet,
  useNavigator,
  useQueryParams,
} from '@karrotframe/navigator';

import nav_back from '../../assets/icon/nav_back.svg';
import nav_close from '../../assets/icon/nav_close.svg';
import RedirectHouse from '../../assets/icon/RedirectHouse';
import { COLOR } from '../../constant/color';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 20px;
`;
const NavCustomBtn = styled.img`
  margin-left: 1.5rem;
`;
const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TextArea = styled.div`
  color: ${COLOR.LIGHT_GRAY};
  margin-top: 1.8rem;
  margin-bottom: 4.8rem;
`;

const EnterBtn = styled.div`
  color: ${COLOR.TEXT_WHITE};
  border-radius: 0.6rem;
  background-color: ${COLOR.LIGHT_GREEN};
  padding: 0.9rem 2rem;
  font-size: 1.4rem;
  line-height: 2.3rem;
  text-align: center;
  letter-spacing: -0.03rem;
`;

const changeHouseColor = keyframes`
  from, 0%, to {
    fill: ${COLOR.LIGHT_GREEN_000}
  }

  33% {
    fill: ${COLOR.LIGHT_GREEN}
  }

  66% {   
    fill: ${COLOR.SECONDARY};
  }
`;

const changeWindowColor = keyframes`
  from, 0%, to {
    fill: ${COLOR.TEXT_WHITE}
  }

  33% {
    fill: ${COLOR.SECONDARY}
  }

  66% {   
    fill: ${COLOR.LIGHT_GREEN}
  }
  }
`;

const RedirectHouseStyle = styled(RedirectHouse)`
  .house {
    animation: ${changeHouseColor} 1s ease infinite;
  }
  .window {
    animation: ${changeWindowColor} 1s ease infinite;
  }
`;

const BtnWrapper = styled.div`
  color: ${COLOR.TEXT_GRAY};
  margin-bottom: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const GoHomeBtn = styled.span`
  color: ${COLOR.LIGHT_GREEN};
`;

type QueryParamsType = {
  meeting: string;
  meeting_id: string;
};

function RedirectPage(): ReactElement {
  const { replace } = useNavigator();
  const params = new URLSearchParams(location.hash);
  const querystring: Partial<QueryParamsType> = useQueryParams();

  useEffect(() => {
    window.open('https://' + querystring.meeting, '', '_blank');
  }, [params, querystring.meeting]);

  const redirectToMeet = () => {
    window.open('https://' + querystring.meeting, '', '_blank');
  };

  const redirectToHome = () => {
    replace('/');
  };

  return (
    <PageWrapper>
      <ScreenHelmet
        customCloseButton={<NavCustomBtn src={nav_close} />}
        customBackButton={<NavCustomBtn src={nav_back} />}
      />
      <ContentsArea>
        <RedirectHouseStyle />
        <TextArea className="body2">모임에 입장하는 중이에요</TextArea>
        <EnterBtn onClick={redirectToMeet}>직접 입장하기</EnterBtn>
      </ContentsArea>

      <BtnWrapper className="body4">
        모임에 입장할 수 없나요?{' '}
        <GoHomeBtn onClick={redirectToHome}>홈으로 돌아가기</GoHomeBtn>
      </BtnWrapper>
    </PageWrapper>
  );
}

export default RedirectPage;
