import React, { ReactElement, useState } from 'react';

import styled from '@emotion/styled';

import { COLOR } from '../../../constant/color';

function InputList(): ReactElement {
  const [inputElement, setInputElement] = useState([
    <InputStyle placeholder="예) 함께 열심히 공부하고 싶은 분" />,
  ]);

  const addInput = () => {
    setInputElement(prevState => [
      ...prevState,
      <InputStyle placeholder="예) 함께 열심히 공부하고 싶은 분" />,
    ]);
  };
  return (
    <InputListWrapper>
      {inputElement.map(input => input)}
      <button onClick={addInput}>추가</button>
    </InputListWrapper>
  );
}

const InputListWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  &::placeholder {
    font-size: 1.5rem;
    line-height: 2.3rem;
    letter-spacing: -0.03rem;
    color: ${COLOR.GREY_500};
  }
`;

const InputStyle = styled.input`
  padding: 1.6rem;
  width: 100%;
  height: 5.5rem;
  border: 1px solid #cbcccd;
  box-sizing: border-box;
  border-radius: 0.6rem;
`;

export default InputList;
