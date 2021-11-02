import React, { useState, useMemo, useEffect } from 'react';

import styled from '@emotion/styled';
import { logEvent } from '@firebase/analytics';
import { useCurrentScreen, useNavigator } from '@karrotframe/navigator';
import { IoEllipse } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

import { meetingSuggestion } from '../../api/suggestion';
import { analytics } from '../../App';
import bulb from '../../assets/icon/bulb.svg';
import { COLOR } from '../../constant/color';
import { SUGGESTION } from '../../constant/message';
import useViewportSize from '../../hook/useViewportSize';
import { userInfoAtom } from '../../store/user';
import mini from '../../util/mini';
import { checkMobileType } from '../../util/utils';
import CustomScreenHelmet from '../common/CustomScreenHelmet';

interface ButtonProps {
  inputFocus: boolean;
  inputLength: number;
}
interface ContentsWrapperProps {
  isSubmit: boolean;
}

const PageWrapper = styled.div<{ height: number | undefined }>`
  width: 100%;
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition-property: height;
  transition-duration: 0.2s;
`;

const ContentsWrapper = styled.div<ContentsWrapperProps>`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.isSubmit ? 1 : 0)};
  justify-content: ${props => (props.isSubmit ? 'flex-end' : 'none')};

  transition-property: flex, justify-content;
  transition-duration: 0.3s, 0.3s;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.2rem 0 1.2rem 0;
  position: relative;
`;

const BulbIcon = styled.div`
  z-index: 2;
`;

const EllipseIcon = styled.div`
  position: absolute;
  top: -0.5rem;
  z-index: 1;
`;

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03em;
  margin-left: 3.2rem;
  box-sizing: border-box;
`;

const SuggestionTitle = styled.div`
  word-break: keep-all;

  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.8rem;
  text-align: center;
  letter-spacing: -0.04rem;
  margin: 0 1.6rem 2.4rem 1.6rem;
  white-space: pre-line;
`;

const TextArea = styled.textarea`
  height: 16.7rem;
  margin: 0 1.6rem;
  padding: 1.6rem;
  border: 0.1rem solid ${COLOR.TEXTAREA_LIGHT_GRAY};
  border-radius: 0.6rem;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.TEXT_BLACK};
  resize: none;

  &::placeholder {
    color: ${COLOR.TEXTAREA_LIGHT_GRAY};
  }
  &:focus {
    outline: none !important;
    border: 1px solid ${COLOR.LIGHT_GREEN};
  }
`;

const ButtonWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Button = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 5rem;
  color: white;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.8rem;
  text-align: center;
  letter-spacing: -0.04rem;

  border-radius: ${({ inputFocus }) => (inputFocus ? 0 : '.6rem')};
  background-color: ${({ inputLength }) =>
    inputLength > 0 ? COLOR.LIGHT_GREEN : COLOR.TEXTAREA_LIGHT_GRAY};
  margin: ${({ inputFocus }) => (inputFocus ? 0 : '1.6rem 2rem')};

  transition-property: margin, border-radius;
  transition-duration: 0.5s, 0.5s;
`;

const MeetingSuggestionPage = () => {
  const { isRoot } = useCurrentScreen();
  const [inputFocus, setInputFocus] = useState(false);
  const [text, setText] = useState('');
  const [submit, setsubmit] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const { pop } = useNavigator();
  const size = useViewportSize();

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmitHandler = async () => {
    if (submit) {
      if (isRoot) mini.close();
      else pop();
      return;
    }
    if (text.length === 0) return;
    const result = await meetingSuggestion(text);
    if (result.success) setsubmit(true);
  };

  const Title = useMemo(() => {
    if (submit && userInfo)
      return `${userInfo.nickname}의 ${SUGGESTION.DONE_SUBMIT_TITLE}`;
    if (submit) return SUGGESTION.DONE_SUBMIT_TITLE;
    return SUGGESTION.TELL_ME_NEW_MEETING;
  }, [submit, userInfo]);

  useEffect(() => {
    logEvent(analytics, 'suggestion_page__show');
  }, []);

  return (
    <PageWrapper
      className="meeting-suggestion"
      height={
        inputFocus && checkMobileType() === 'Cupertino' ? size[1] : undefined
      }
    >
      <CustomScreenHelmet
        appendLeft={<PageTitle>{SUGGESTION.NAVIGATOR_TITLE}</PageTitle>}
      />
      <ContentsWrapper isSubmit={submit}>
        <IconWrapper>
          <BulbIcon>
            <img src={bulb} />
          </BulbIcon>
          {submit && (
            <EllipseIcon>
              <IoEllipse size="3.5rem" fill={COLOR.SECONDARY_YELLOW} />
            </EllipseIcon>
          )}
        </IconWrapper>

        <SuggestionTitle className="meeting-suggestion__title">
          {Title}
        </SuggestionTitle>
        {!submit && (
          <TextArea
            className="meeting-suggestion__textarea"
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onChange={onChangeHandler}
            value={text}
            placeholder={
              userInfo?.region
                ? `${userInfo.region} ${SUGGESTION.NEW_MEETING_INPUT_PLACEHOLDER}`
                : SUGGESTION.NEW_MEETING_INPUT_PLACEHOLDER
            }
          />
        )}
      </ContentsWrapper>

      <ButtonWrapper>
        <Button
          className="meeting-suggestion__submit"
          inputFocus={inputFocus}
          inputLength={text.length}
          onClick={onSubmitHandler}
        >
          {submit ? SUGGESTION.CONFITM_BUTTON : SUGGESTION.SUBMIT_BUTTON}
        </Button>
      </ButtonWrapper>
    </PageWrapper>
  );
};

export default MeetingSuggestionPage;
