import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { checkMobileType } from '../../util/utils';

import { Arrow_back_and, Arrow_back_ios } from '../../assets/icon';
import { mini } from '../../App';
import { COLOR } from '../../constant/color';

function NavBar(): ReactElement {
  return (
    <NavigationBar>
      <CloseBtn onClick={() => mini.close()}>
        {checkMobileType() === 'Android' ? (
          <Arrow_back_and fill={COLOR.ICON_GRAY} />
        ) : (
          <Arrow_back_ios fill={COLOR.ICON_GRAY} width="20" />
        )}
      </CloseBtn>
    </NavigationBar>
  );
}

export default NavBar;

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
