import React from 'react';

import styled from '@emotion/styled';
import { ScreenHelmet } from '@karrotframe/navigator';

import nav_back from '../../assets/icon/common/nav_back.svg';
import nav_close from '../../assets/icon/common/nav_close.svg';

type Props = {
  appendRight?: React.ReactNode;
  appendMiddle?: React.ReactNode;
  appendLeft?: React.ReactNode;
  customCloseButton?: React.ReactNode;
  customBackButton?: React.ReactNode;
  onCustomCloseButton?: (e?: any) => void;
  onCustomBackButton?: (e?: any) => void;
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
  return (
    <ScreenHelmet
      customCloseButton={
        customCloseButton || (
          <NavCustomBtn
            src={nav_close}
            onClick={e => onCustomCloseButton && onCustomCloseButton(e)}
          />
        )
      }
      customBackButton={
        customBackButton || (
          <NavCustomBtn
            src={nav_back}
            onClick={e => onCustomBackButton && onCustomBackButton(e)}
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
