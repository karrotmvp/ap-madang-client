import React, { ReactElement, useCallback } from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import RedirectHouse from "../../assets/icon/RedirectHouse";
import { COLOR } from "../../constant/color";
import { REDIRECT } from "../../constant/message";
import CustomScreenHelmet from "../common/CustomScreenHelmet";

function RedirectPage(): ReactElement {
  const redirectToHome = useCallback(() => {
    window.open(process.env.REACT_APP_KARROT_SCHEME);
  }, []);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <ContentsArea>
        <RedirectHouseStyle />
        <TextArea className="body2">{REDIRECT.TITLE}</TextArea>
      </ContentsArea>

      <BtnWrapper className="body4">
        {REDIRECT.CANT_JOIN}
        <GoHomeBtn onClick={redirectToHome}>{REDIRECT.GO_HOME}</GoHomeBtn>
      </BtnWrapper>
    </PageWrapper>
  );
}

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

export default RedirectPage;
