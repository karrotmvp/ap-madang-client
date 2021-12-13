import React, { ReactElement, useCallback, useMemo } from 'react';

import styled from '@emotion/styled';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';

import nav_back from '../../assets/icon/common/nav_back.svg';
import nav_close from '../../assets/icon/common/nav_close.svg';
import { COLOR } from '../../constant/color';
import mini from '../../util/mini';

type Props = {
  appendRight?: React.ReactNode;
  appendMiddle?: React.ReactNode;
  customCloseButton?: React.ReactNode;
  customBackButton?: React.ReactNode;
  onCustomCloseButton?: () => void;
  onCustomBackButton?: () => void;
};

function CustomScreenHelmet({
  customCloseButton,
  customBackButton,
  onCustomCloseButton,
  onCustomBackButton,
  appendRight,
  appendMiddle,
}: Props): ReactElement {
  const { isRoot } = useCurrentScreen();
  const { pop, replace } = useNavigator();

  const popCreatedMeeting = useCallback(() => {
    const urlHashParams = new URLSearchParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
    );
    if (isRoot) replace('/');
    else {
      if (urlHashParams.get('ref') === 'created') {
        pop(2);
      } else pop();
    }
  }, [isRoot, pop, replace]);

  const backButton = useMemo(() => {
    return (
      customBackButton || (
        <NavCustomBtn
          src={nav_back}
          onClick={
            onCustomBackButton ? onCustomBackButton : () => popCreatedMeeting()
          }
        />
      )
    );
  }, [customBackButton, onCustomBackButton, popCreatedMeeting]);

  const closeButton = useMemo(() => {
    return (
      customCloseButton || (
        <NavCustomBtn
          src={nav_close}
          onClick={
            onCustomCloseButton ? onCustomCloseButton : () => mini.close()
          }
        />
      )
    );
  }, [customCloseButton, onCustomCloseButton]);

  const leftButton = useMemo(() => {
    return isRoot ? closeButton : backButton;
  }, [backButton, closeButton, isRoot]);

  return (
    <ScreenHelmet>
      <AppendLeft>{leftButton}</AppendLeft>
      <AppendMiddle>{appendMiddle}</AppendMiddle>
      <AppendRight>{appendRight && appendRight}</AppendRight>
    </ScreenHelmet>
  );
}

const ScreenHelmet = styled.div`
  position: sticky;
  top: 0;
  background: white;
  width: 100%;
  height: 5.6rem;
  min-height: 5.6rem;
  padding: 0 1.6rem;
  border-bottom: 1px solid ${COLOR.NAV_BORDER_GREY};
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
`;

const NavCustomBtn = styled.img``;

const AppendLeft = styled.div`
  flex: 1;
`;

const AppendMiddle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AppendRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export default CustomScreenHelmet;
