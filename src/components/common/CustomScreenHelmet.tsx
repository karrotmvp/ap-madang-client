import React, { useCallback } from 'react';

import styled from '@emotion/styled';
import {
  ScreenHelmet,
  useCurrentScreen,
  useNavigator,
} from '@karrotframe/navigator';

import nav_back from '../../assets/icon/common/nav_back.svg';
import nav_close from '../../assets/icon/common/nav_close.svg';

type Props = {
  appendRight?: React.ReactNode;
  appendMiddle?: React.ReactNode;
  appendLeft?: React.ReactNode;
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
  appendLeft,
}: Props) {
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

  return (
    <ScreenHelmet
      customCloseButton={
        customCloseButton || (
          <NavCustomBtn src={nav_close} onClick={onCustomCloseButton} />
        )
      }
      customBackButton={
        customBackButton || (
          <NavCustomBtn
            src={nav_back}
            onClick={onCustomBackButton || popCreatedMeeting}
          />
        )
      }
      title={appendMiddle && <Middle>{appendMiddle}</Middle>}
      appendLeft={appendLeft && appendLeft}
      appendRight={appendRight && appendRight}
    />
  );
}

const NavCustomBtn = styled.img`
  margin-left: 1.6rem;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default CustomScreenHelmet;
