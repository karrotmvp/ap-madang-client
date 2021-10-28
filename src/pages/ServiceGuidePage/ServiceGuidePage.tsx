import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { useNavigator } from 'karrotframe/lib';
import { useRecoilState } from 'recoil';

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

function ServiceGuidePage(): ReactElement {
  const [code, setCode] = useRecoilState(codeAtom);
  const { replace } = useNavigator();
  const onBoard = localStorage.getItem('onboard');

  const btnHandler = () => {
    localStorage.setItem('onboard', 'true');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const isPreload = urlSearchParams.get('preload');
    const codeParams = urlSearchParams.get('code');

    if (codeParams) {
      setCode(codeParams);
      replace('/');
    } else if (!code && isPreload !== 'true') {
      mini.startPreset({
        preset: process.env.MINI_PRESET_URL || '',
        params: { appId: process.env.APP_ID || '' },
        onSuccess(result: { code: string }) {
          if (result && result.code) {
            setCode(result.code);
            // replace('/');
          }
        },
        onClose() {
          replace('/');
        },
      });
    }
  };

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

export default ServiceGuidePage;
