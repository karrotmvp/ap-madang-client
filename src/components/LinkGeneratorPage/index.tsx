import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useRecoilValue } from 'recoil';

import { generateShortLink } from '../../api/meeting';
import { analytics } from '../../App';
import speaker from '../../assets/icon/linkGenerator/speaker.svg';
import link_generator_guide from '../../assets/image/link_generator_guide.png';
import useMini from '../../hook/useMini';
import { userInfoAtom } from '../../store/user';
import { COLOR } from '../../style/color';
// import daangnBridge from '../../util/daangnBridge';
import mini from '../../util/mini';
import { getParams } from '../../util/utils';
import CircularProgress from '../common/Circular-progress';
import CustomScreenHelmet from '../common/CustomScreenHelmet';
import PrimaryButton from '../common/PrimaryButton';
import Spinner from '../common/SpinnerModal';
import LinkBottomSheet from './components/LinkBottomSheet';

function LinkGeneratorPage(): ReactElement {
  const [openLinkBottomSheet, setOpenLinkBottomSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { loginWithMini } = useMini();
  const userInfo = useRecoilValue(userInfoAtom);

  const sharedRef = useMemo(() => {
    return getParams(
      window.location.hash.substring(window.location.hash.indexOf('?')),
      'shared',
    ).split('&')[0];
  }, []);

  const goBackHandler = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();
      if (sharedRef) {
        // daangnBridge.router.close();
        mini.close();
        window.close();
      } else {
        mini.close();
      }
    },
    [sharedRef],
  );

  const onClickGenerateLink = useCallback(async () => {
    logEvent(analytics, 'link_gen_btn__click', {
      userNickname: userInfo?.nickname,
      userRegion: userInfo?.region,
    });
    setLoading(true);
    const result = await generateShortLink();

    if (result.success && result.data) {
      setUrl(
        `${process.env.CLIENT_URL}/?#/short?share_code=${result.data.share_code}`,
      );
      setOpenLinkBottomSheet(true);
      setLoading(false);
    }
    setOpenLinkBottomSheet(true);
  }, [userInfo]);

  useEffect(() => {
    console.log('userInfo11', userInfo?.nickname, userInfo?.region);
  }, [userInfo]);

  return (
    <Container>
      <CustomScreenHelmet
        onCustomBackButton={goBackHandler}
        onCustomCloseButton={goBackHandler}
      />

      <Spinner show={loading}>
        <CircularProgress />
      </Spinner>
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
          <Title>
            동네 이웃과
            <br />
            <OrangeTitle>음성으로</OrangeTitle>
            <br />
            이야기해보세요
          </Title>
        </TopBanner>
        <GuideImage src={link_generator_guide} />
      </Wrapper>
      <FloatButtonWrapper>
        <PrimaryButton onClick={() => loginWithMini(onClickGenerateLink)}>
          모임방 만들기
        </PrimaryButton>
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
  padding: 6rem 3.2rem;
  background: #fcf5ee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpeakerImage = styled.img``;

const Title = styled.span`
  margin-top: 2rem;
  font-size: 4rem;
  line-height: 120%;
  text-align: center;
  letter-spacing: -0.02rem;
  font-family: 'HGSoftGGothicssi_Pro_99g';
  color: #4d5159;
`;

const OrangeTitle = styled(Title)`
  color: #fe8745;
`;

const GuideImage = styled.img`
  width: 100%;
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
