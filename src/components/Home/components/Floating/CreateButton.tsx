import React from 'react';

import styled from '@emotion/styled';
import big_plus__white from '@icon/landingPage/big_plus__white.svg';
import { useNavigator } from '@karrotframe/navigator';

function CreateButton() {
  const { push } = useNavigator();
  return (
    <CreateBtn
      onClick={() => {
        push('/create');
      }}
    >
      <img src={big_plus__white} />
    </CreateBtn>
  );
}

const CreateBtn = styled.div`
  right: 0;
  bottom: 0;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.$carrot500};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CreateButton;
