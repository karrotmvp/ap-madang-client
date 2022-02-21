import React from 'react';

import mic_icon from '@assets/icon/CreatePage/mic_icon.svg';
import video_icon from '@assets/icon/CreatePage/video_icon.svg';
import Spacing from '@components/Home/components/Spacing';
import styled from '@emotion/styled';
import { COLOR } from '@style/color';
import { useFormContext } from 'react-hook-form';

type MeetingTypeCardType = {
  id: string;
  value: string;
  name: string;
  icon: string;
  title: string;
  info: string;
};

function MeetingType() {
  const {
    formState: { errors },
  } = useFormContext();

  const validError = errors.type;

  return (
    <MeetingTypeWrapper>
      <TitleText>진행 방식</TitleText>
      {validError && (
        <>
          <Spacing height="0.8rem" />
          <ValidationMessage>모임 진행 방식을 선택해주세요.</ValidationMessage>
        </>
      )}
      <Spacing height="1.3rem" />
      <TypeBtnWrapper>
        <MeetingTypeCard
          id="audio"
          value="audio"
          name="type"
          icon={mic_icon}
          title="음성모임"
          info="음성모임은 목소리로만 진행되는 모임이에요. 모임 링크는 자동으로 생성돼요."
        />
        <Spacing height="2rem" />
        <MeetingTypeCard
          id="video"
          value="video"
          name="type"
          icon={video_icon}
          title="화상모임"
          info="화상모임은 줌(zoom) 링크가 자동으로 생성돼요. 줌 어플을 다운로드한 후 이용할 수 있어요."
        />
      </TypeBtnWrapper>
    </MeetingTypeWrapper>
  );
}

const MeetingTypeCard = ({
  id,
  value,
  name,
  icon,
  title,
  info,
}: MeetingTypeCardType) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const isChecked = watch(name) === value;

  return (
    <TypeBtn>
      <RadioInput
        type="radio"
        id={id}
        value={value}
        validError={errors.type}
        {...register(name, { required: true })}
      />
      <TypeContentWrapper>
        <TypeHeader>
          <TypeIcon src={icon} />
          <Spacing width="0.6rem" />
          <TypeName>{title}</TypeName>
        </TypeHeader>
        {isChecked && <TypeInfo>{info}</TypeInfo>}
      </TypeContentWrapper>
    </TypeBtn>
  );
};

const titleTextStyle = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.04rem;
  color: ${({ theme }) => theme.colors.$gray900};
`;

const TitleText = styled(titleTextStyle)`
  color: ${({ theme }) => theme.colors.$gray900};
`;

const MeetingTypeWrapper = styled.div`
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.GREY_500};
`;

const ValidationMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font-size: 1.3rem;
  line-height: 1.6rem;
  letter-spacing: -0.03rem;
  color: #ff5638;
`;

const TypeBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TypeIcon = styled.img``;

const TypeBtn = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  box-sizing: border-box;
`;

const RadioInput = styled.input<{ validError: boolean }>`
  min-width: 2rem;
  min-height: 2rem;
  margin-right: 1.2rem;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;

  border: 1px solid
    ${({ validError, theme }) =>
      validError ? '#ff5638' : theme.colors.$gray500};
  border-radius: 100%;

  &:before {
    position: absolute;
    display: block;
    content: '';
    border: 2px solid white;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-radius: 100%;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.$white};
    border: 7px solid ${({ theme }) => theme.colors.$button.primary};
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 100%;
  }
`;

const TypeContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypeHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.8rem;
  color: ${COLOR.TEXT_BLACK};
`;

const TypeName = styled.div`
  font-size: 1.6rem;
  line-height: 2.2rem;
  letter-spacing: -0.02rem;

  color: ${({ theme }) => theme.colors.$gray900};
`;

const TypeInfo = styled.div`
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: -0.02rem;
  color: ${({ theme }) => theme.colors.$gray700};
`;

export default MeetingType;
