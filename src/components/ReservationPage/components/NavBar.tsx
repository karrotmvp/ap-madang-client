import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { ArrowBackAnd, ArrowBackIos } from '../../../assets/icon';
import { COLOR } from '../../../constant/color';
import mini from '../../../util/mini';
import { checkMobileType } from '../../../util/utils';

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
  border-bottom: 1px solid ${COLOR.NAV_BORDER_GRAY};
`;

const CloseBtn = styled.div`
  width: 1.5rem;
  padding: 2.4rem 2.442rem;
`;

function NavBar(): ReactElement {
  return (
    <NavigationBar className="navigation-bar">
      <CloseBtn onClick={() => mini.close()}>
        {checkMobileType() === 'Android' ? (
          <ArrowBackAnd fill={COLOR.ICON_GRAY} />
        ) : (
          <ArrowBackIos fill={COLOR.ICON_GRAY} width="20" />
        )}
      </CloseBtn>
    </NavigationBar>
  );
}

export default NavBar;
