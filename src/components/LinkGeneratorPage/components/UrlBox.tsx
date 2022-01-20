import React, { ReactElement, useRef } from 'react';

import styled from '@emotion/styled';

interface Props {
  url: string;
  copySuccess: boolean;
  setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function UrlBox({ url, copySuccess, setCopySuccess }: Props): ReactElement {
  const textAreaRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const onClickHandler = () => {
    const textField = document.createElement('textarea');
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopySuccess(true);
  };

  return (
    <Wrapper>
      <UrlText ref={textAreaRef}>{url}</UrlText>
      <TextButton onClick={onClickHandler} copySuccess={copySuccess}>
        {copySuccess ? '복사 완료' : '복사'}
      </TextButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* Scale/Gray/Gray00 */

  background: #ffffff;
  /* Scale/Gray/Gray400 */

  border: 1px solid #d1d3d8;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0.6rem 1.6rem;
`;

const UrlText = styled.div`
  width: 100%;
  font-size: 1.6rem;
  line-height: 135%;
  letter-spacing: -0.02rem;

  /* Scale/Gray/Gray900 */
  color: #212124;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1.6rem;

  border: none;
`;

const TextButton = styled.div<{ copySuccess: boolean }>`
  flex-basis: auto;
  white-space: nowrap;
  background: ${({ copySuccess }) => (copySuccess ? '#dcdee3' : '#FF7E36')};
  border-radius: 0.5rem;
  color: white;
  font-size: 1.4rem;
  line-height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02rem;

  padding: 0.8rem 1.4rem;
`;

export default UrlBox;
