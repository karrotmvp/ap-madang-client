import React, { ReactElement, useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { generateShortLink } from '../../api/meeting';
import speaker from '../../assets/icon/linkGenerator/speaker.svg';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import { COLOR } from '../../style/color';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import LinkBottomSheet from './components/LinkBottomSheet';
import PrimaryButton from './components/PrimaryButton';

function LinkGeneratorPage(): ReactElement {
  const [openLinkBottomSheet, setOpenLinkBottomSheet] = useState(false);
  const [url, setUrl] = useState('');
  const { loginWithMini } = useMini();
  const userInfo = useRecoilValue(userInfoAtom);

  const onClickGenerateLink = async () => {
    const result = await generateShortLink();

    if (result.success && result.data) {
      setUrl(result.data.short_url);
      setOpenLinkBottomSheet(true);
    }
    setOpenLinkBottomSheet(true);
  };

  return (
    <Container>
      <CustomScreenHelmet />
      {openLinkBottomSheet && (
        <LinkBottomSheet
          onClose={() => setOpenLinkBottomSheet(false)}
          open={openLinkBottomSheet}
          url={url}
        />
      )}
      <Wrapper>
        <TopBanner>
          <SpeakerImage src={speaker} />
          {userInfo?.nickname && (
            <UserNameText>{userInfo.nickname}님의</UserNameText>
          )}
          <Title>
            <OrangeTitle>음성 모임방</OrangeTitle>을
            <br />
            만들어드려요
          </Title>
        </TopBanner>
      </Wrapper>
      <FloatButtonWrapper>
        <PrimaryButton
          onClick={() => loginWithMini(onClickGenerateLink)}
          text="모임생성하기"
        />
      </FloatButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-line;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const TopBanner = styled.div`
  padding: 6rem 0;
  background: #fcf5ee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpeakerImage = styled.img``;

const UserNameText = styled.div`
  margin-top: 2rem;
  font-size: 2.6rem;
  line-height: 125%;
  text-align: center;
  letter-spacing: -0.02rem;
  color: #4d5159;
`;

const Title = styled.span`
  margin-top: 0.4rem;
  font-size: 4rem;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.02rem;
`;

const OrangeTitle = styled(Title)`
  color: #fe8745;
`;

const FloatButtonWrapper = styled.div`
  max-height: 7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.6rem;
  border-top: 1px solid ${COLOR.NAVBAR_TOP_BORDER};
`;

export default LinkGeneratorPage;
