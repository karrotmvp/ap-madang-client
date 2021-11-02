import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import { ScreenHelmet } from '@karrotframe/navigator';

import nav_back from '../../assets/icon/nav_back.svg';
import nav_close from '../../assets/icon/nav_close.svg';

type Props = {
  appendLeft?: React.ReactNode;
};

function CustomScreenHelmet({ appendLeft }: Props): ReactElement {
  return (
    <ScreenHelmet
      customCloseButton={<NavCustomBtn src={nav_close} />}
      customBackButton={<NavCustomBtn src={nav_back} />}
      appendLeft={appendLeft}
    />
  );
}

const NavCustomBtn = styled.img`
  margin-left: 1.5rem;
`;

export default CustomScreenHelmet;
