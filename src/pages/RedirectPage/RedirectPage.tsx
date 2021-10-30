import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigator } from '@karrotframe/navigator';

import RedirectHouse from '../../assets/icon/RedirectHouse';
import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';
import { COLOR } from '../../constant/color';
import { REDIRECT } from '../../constant/message';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 20px;
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
  0% {
    fill: ${COLOR.LIGHT_GREEN_000}
  }

  32% {
    fill: ${COLOR.LIGHT_GREEN_000}
  }

  33% {
    fill: ${COLOR.LIGHT_GREEN}
  }
  65% {
    fill: ${COLOR.LIGHT_GREEN}
  }

  66% {   
    fill: ${COLOR.SECONDARY};
  }
  100% {   
    fill: ${COLOR.SECONDARY};
  }
`;

const changeWindowColor = keyframes`
  0%{
    fill: ${COLOR.TEXT_WHITE}
  }
  32%{
    fill: ${COLOR.TEXT_WHITE}
  }

  33% {
    fill: ${COLOR.SECONDARY}
  }
  65% {
    fill: ${COLOR.SECONDARY}
  }

  66% {   
    fill: ${COLOR.LIGHT_GREEN}
  }
  100% {   
    fill: ${COLOR.LIGHT_GREEN}
  }
  
`;

const RedirectHouseStyle = styled(RedirectHouse)`
  .house {
    animation: ${changeHouseColor} 2s ease infinite;
  }
  .window {
    animation: ${changeWindowColor} 2s ease infinite;
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
  font-weight: 500;
  margin-left: 0.5rem;
  color: ${COLOR.LIGHT_GREEN};
`;

function RedirectPage(): ReactElement {
  const { replace } = useNavigator();
  const [redirected, setRedirected] = useState(false);

  const openNewWindow = (meetingUrl: string, pwd: string) => {
    window.open(
      'https://' + meetingUrl.replace('%2F', '/') + '?pwd=' + pwd,
      '',
      '_blank',
    );
  };

  const redirectToMeet = useCallback(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const url = urlSearchParams.get('meeting_url');
    const pwd = urlSearchParams.get('pwd');
    if (url && pwd) {
      openNewWindow(url, pwd);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!redirected) {
        redirectToMeet();
        setRedirected(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [redirectToMeet, redirected]);

  const redirectToHome = useCallback(() => {
    replace('/');
  }, [replace]);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <ContentsArea>
        <RedirectHouseStyle />
        <TextArea className="body2">{REDIRECT.TITLE}</TextArea>
        <EnterBtn onClick={redirectToMeet}>{REDIRECT.BTN_TEXT}</EnterBtn>
      </ContentsArea>

      <BtnWrapper className="body4">
        {REDIRECT.CANT_JOIN}
        <GoHomeBtn onClick={redirectToHome}>{REDIRECT.GO_HOME}</GoHomeBtn>
      </BtnWrapper>
    </PageWrapper>
  );
}

export default RedirectPage;
