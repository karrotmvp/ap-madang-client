import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { ArrowBackAnd, ArrowBackIos } from '../../../assets/icon';
import { COLOR } from '../../../constant/color';
import { useMini } from '../../../hook/useMini';
import { checkMobileType } from '../../../util/utils';

function NavBar(): ReactElement {
  const { ejectApp } = useMini();

  return (
    <NavigationBar className="navigation-bar">
      <CloseBtn onClick={ejectApp}>
        {checkMobileType() === 'Android' ? (
          <ArrowBackAnd fill={COLOR.ICON_GREY} />
        ) : (
          <ArrowBackIos fill={COLOR.ICON_GREY} width="20" />
        )}
      </CloseBtn>
    </NavigationBar>
  );
}

const NavigationBar = styled.nav`
  width: 100%;
  height: 5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${COLOR.NAV_BACKGROUND_WHITE};
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${COLOR.NAV_BORDER_GREY};
`;

const CloseBtn = styled.div`
  width: 1.5rem;
  padding: 2.4rem 2.442rem;
`;

export default NavBar;
