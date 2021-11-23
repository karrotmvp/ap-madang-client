import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { ScreenHelmet } from '@karrotframe/navigator';

import nav_back from '../../assets/icon/nav_back.svg';
import nav_close from '../../assets/icon/nav_close.svg';

type Props = {
  appendLeft?: React.ReactNode;
  appendRight?: React.ReactNode;
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
  appendLeft,
  appendRight,
}: Props): ReactElement {
  return (
    <ScreenHelmet
      customCloseButton={
        customCloseButton || (
          <NavCustomBtn src={nav_close} onClick={onCustomCloseButton} />
        )
      }
      customBackButton={
        customBackButton || (
          <NavCustomBtn src={nav_back} onClick={onCustomBackButton} />
        )
      }
      appendLeft={appendLeft}
      appendRight={appendRight}
    />
  );
}

const NavCustomBtn = styled.img`
  margin-left: 1.5rem;
`;

export default CustomScreenHelmet;
