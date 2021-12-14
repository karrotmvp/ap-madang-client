import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useNavigator } from '@karrotframe/navigator';

import { analytics } from '../../../App';
import { COLOR } from '../../../constant/color';

function CreateFooter(): ReactElement {
  const { push } = useNavigator();

  const onCreateBtnClickHandler = async () => {
    logEvent(analytics, 'create_guide_btn__click');
    push('/create?ref=banner');
  };

  return (
    <FooterWrapper>
      <Btn onClick={onCreateBtnClickHandler}>모임 만들기</Btn>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  max-height: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

const Btn = styled.div`
  width: 100%;
  height: 4.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  background: ${COLOR.LIGHT_GREEN};

  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.3rem;
  color: ${COLOR.TEXT_WHITE};
`;

export default CreateFooter;
