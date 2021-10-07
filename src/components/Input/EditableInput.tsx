import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { COLOR } from '../../constant/color';

function EditableInput({
  contentEditable,
  placeholder,
  formHandler,
}: Props): ReactElement {
  return (
    <EditableArea
      contentEditable={contentEditable}
      placeholder={placeholder}
      onInput={(e: React.ChangeEvent<HTMLDivElement>) =>
        formHandler && formHandler(e.target.innerText)
      }
    />
  );
}

export default EditableInput;

interface Props {
  contentEditable?: boolean;
  placeholder?: string;
  formHandler?: React.Dispatch<React.SetStateAction<string>>;
}

const EditableArea = styled.div`
  width: 100%;
  min-height: 1.5rem;
  max-height: 7.5rem;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${COLOR.INPUT_BORDER_GRAY};
  color: ${COLOR.TEXT_BLACK};
  caret-color: ${COLOR.LIGHT_GREEN};
  overflow-y: scroll;

  font-size: 1.7rem;
  font-family: 'Pretendard';
  line-height: 2.5rem;
  letter-spacing: -0.03rem;
  padding-bottom: 0.4rem;
  margin-top: 6rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
  }
  &[placeholder]:empty::before {
    content: attr(placeholder);
    color: ${COLOR.PLACEHOLDER_GRAY};
  }
`;
