import React, { ReactElement, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from 'karrotframe/lib';
import { useRecoilState } from 'recoil';

import { analytics } from '../../App';
import service_guide from '../../assets/image/service_guide.png';
import CustomScreenHelmet from '../../components/CustomScreenHelmet/CustomScreenHelmet';
import { COLOR } from '../../constant/color';
import { GUIDE } from '../../constant/message';
import { codeAtom } from '../../store/user';
import mini from '../../util/mini';

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
  box-sizing: border-box;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ButtonWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1.2rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const Button = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.8rem;
  text-align: center;
  letter-spacing: -0.04rem;
  color: ${COLOR.TEXT_WHITE};
  background: ${COLOR.LIGHT_GREEN};
  border-radius: 0.6rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function OnBoardPage(): ReactElement {
  const [code, setCode] = useRecoilState(codeAtom);
  const onBoard = localStorage.getItem('onboard');
  const { replace } = useNavigator();
  const startTime = new Date();

  const successGetCodeCB = (code: string) => {
    logEvent(analytics, 'onBoard__success', {
      start_time: startTime,
      end_time: new Date(),
    });
    localStorage.setItem('onboard', 'true');
    setCode(code);
    replace('/');
  };

  const btnHandler = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const isPreload = urlSearchParams.get('preload');
    const codeParams = urlSearchParams.get('code');

    if (codeParams) {
      successGetCodeCB(codeParams);
    } else if (!code && isPreload !== 'true') {
      mini.startPreset({
        preset: process.env.MINI_PRESET_URL || '',
        params: { appId: process.env.APP_ID || '' },
        onSuccess(result: { code: string }) {
          if (result && result.code) successGetCodeCB(result.code);
        },
      });
    }
  };

  useEffect(() => {
    logEvent(analytics, 'onBoard__show', {
      start_time: startTime,
    });
  }, [startTime]);

  return (
    <PageWrapper>
      <CustomScreenHelmet />
      <ContentsWrapper>
        <Image src={service_guide} />
      </ContentsWrapper>
      {!onBoard && (
        <ButtonWrapper>
          <Button onClick={btnHandler}>{GUIDE.ENTER_BTN}</Button>
        </ButtonWrapper>
      )}
    </PageWrapper>
  );
}

export default OnBoardPage;
