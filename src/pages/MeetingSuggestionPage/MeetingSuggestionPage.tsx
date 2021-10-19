import React, { useState, useMemo } from 'react';

import styled from '@emotion/styled';
import { ScreenHelmet, useNavigator } from '@karrotframe/navigator';
import { IoEllipse } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';

import { meetingSuggestion } from '../../api/suggestion';
import Bulb from '../../assets/icon/Bulb';
import { COLOR } from '../../constant/color';
import { SUGGESTION } from '../../constant/message';
import { userInfoAtom } from '../../store/user';

interface ButtonProps {
  inputFocus: boolean;
  inputLength: number;
}
interface ContentsWrapperProps {
  isSubmit: boolean;
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentsWrapper = styled.div<ContentsWrapperProps>`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.isSubmit ? 0.5 : 0)};
  justify-content: ${props => (props.isSubmit ? 'center' : 'none')};

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
  line-height: 1.9rem;
  letter-spacing: -0.02em;
  margin-left: 2rem;
  box-sizing: border-box;
`;

const SuggestionTitle = styled.div`
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 2.8rem;
  text-align: center;
  letter-spacing: -0.04rem;
  margin: 0 0 2.4rem 0;
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
`;

const Button = styled.div<ButtonProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;

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
  const [inputFocus, setInputFocus] = useState(false);
  const [text, setText] = useState('');
  const [submit, setsubmit] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const { pop } = useNavigator();

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmitHandler = async () => {
    if (text.length === 0) return;
    /* TODO: submit axios */
    const result = await meetingSuggestion(text);
    if (result.success) setsubmit(true);
  };

  const Title = useMemo(() => {
    if (submit) {
      if (userInfo && userInfo.nickname)
        return `${userInfo.nickname}의 ${SUGGESTION.DONE_SUBMIT_TITLE}`;
      return SUGGESTION.DONE_SUBMIT_TITLE;
    }
    return SUGGESTION.TELL_ME_NEW_MEETING;
  }, [submit, userInfo]);

  return (
    <PageWrapper>
      <ScreenHelmet
        appendLeft={<PageTitle>{SUGGESTION.NAVIGATOR_TITLE}</PageTitle>}
      />
      <ContentsWrapper isSubmit={submit}>
        <IconWrapper>
          <BulbIcon>
            <Bulb fill={COLOR.LIGHT_GREEN} />
          </BulbIcon>
          {submit && (
            <EllipseIcon>
              <IoEllipse size="3.5rem" fill={COLOR.SECONDARY_YELLOW} />
            </EllipseIcon>
          )}
        </IconWrapper>

        <SuggestionTitle>{Title}</SuggestionTitle>
        {!submit && (
          <TextArea
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

      <Button
        inputFocus={inputFocus}
        inputLength={text.length}
        onClick={submit ? () => pop() : onSubmitHandler}
      >
        {submit ? SUGGESTION.CONFITM_BUTTON : SUGGESTION.SUBMIT_BUTTON}
      </Button>
    </PageWrapper>
  );
};

export default MeetingSuggestionPage;
