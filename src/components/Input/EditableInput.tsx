import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

interface Props {
  placeholder?: string;
  formHandler: React.Dispatch<React.SetStateAction<string>>;
}

const EditableArea = styled.div`
  width: 100%;
  min-height: 1.5rem;
  max-height: 7.5rem;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #a6aaae;
  color: #111111;
  caret-color: #70bb78;
  overflow-y: scroll;

  font-size: 1.7rem;
  font-family: 'Pretendard';
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  padding-bottom: 0.4rem;
  margin-top: 8rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
  }
  &[placeholder]:empty::before {
    content: attr(placeholder);
    color: #c6c9cc;
  }
`;

function EditableInput({ placeholder, formHandler }: Props): ReactElement {
  return (
    <EditableArea
      contentEditable
      placeholder={placeholder}
      onInput={(e: React.ChangeEvent<HTMLDivElement>) =>
        formHandler(e.target.innerText)
      }
    ></EditableArea>
  );
}

export default EditableInput;
