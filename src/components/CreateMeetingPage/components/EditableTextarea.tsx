import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';

import { COLOR } from '../../../style/color';

interface Props {
  placeholder?: string;
  formHandler?: (value: string) => void;
  className?: string;
  height?: string;
  validation?: boolean;
}

function EditableTextarea({
  placeholder,
  formHandler,
  className,
  height,
  validation,
}: Props): ReactElement {
  return (
    <EditableArea
      className={classnames('editable-textarea', className)}
      contentEditable
      height={height}
      placeholder={placeholder}
      validation={validation}
      onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
        formHandler && formHandler(e.target.textContent || '');
      }}
    />
  );
}

const EditableArea = styled.div<{ height?: string; validation?: boolean }>`
  box-sizing: border-box;
  width: auto;
  height: ${props => props.height || 'auto'};
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;
  border: 1px solid
    ${({ validation }) => (validation ? COLOR.GREY_400 : '#ff5638')};
  border-radius: 0.6rem;
  color: ${COLOR.TEXT_BLACK};
  caret-color: ${COLOR.LIGHT_GREEN};
  overflow-y: auto;
  &:focus {
    outline: none !important;
    border: 1px solid
      ${({ validation }) => (validation ? COLOR.LIGHT_GREEN : '#ff5638')};
  }
  &[placeholder]:empty::before {
    content: attr(placeholder);
    color: ${COLOR.PLACEHOLDER_GREY};
  }
`;

export default EditableTextarea;
