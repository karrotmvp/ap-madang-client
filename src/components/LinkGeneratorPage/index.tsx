import React, { ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import { generateShortLink } from '../../api/meeting';
import useMini from '../../hook/useMini';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import LinkBottomSheet from './components/LinkBottomSheet';

function LinkGeneratorPage(): ReactElement {
  const [openLinkBottomSheet, setOpenLinkBottomSheet] = useState(false);
  const [url, setUrl] = useState('');
  const { loginWithMini } = useMini();

  const onClickGenerateLink = async () => {
    const result = await generateShortLink();

    if (result.success && result.data) {
      setUrl(result.data.short_url);
      setOpenLinkBottomSheet(true);
    }
    setOpenLinkBottomSheet(true);
  };

  return (
    <div>
      <CustomScreenHelmet />
      {openLinkBottomSheet && (
        <LinkBottomSheet
          onClose={() => setOpenLinkBottomSheet(false)}
          open={openLinkBottomSheet}
          url={url}
        />
      )}
      <div onClick={() => setOpenLinkBottomSheet(true)}>LinkGeneratorPage</div>
      <ButtonStyle onClick={() => loginWithMini(onClickGenerateLink)}>
        버튼
      </ButtonStyle>

      <ButtonStyle onClick={onClickGenerateLink}>버튼2</ButtonStyle>
    </div>
  );
}

const ButtonStyle = styled.div`
  color: ${({ theme }) => theme.colors.$button.primary};
  font-size: 3rem;
`;

export default LinkGeneratorPage;
