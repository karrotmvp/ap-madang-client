import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import classnames from 'classnames';
import { FieldValues, useController, Control } from 'react-hook-form';

import { COLOR } from '../../../constant/color';

interface Props {
  placeholder?: string;
  formHandler?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  height?: string;
  notValidation?: boolean;
  control: Control<FieldValues>;
  registerForm: {
    name: string;
    config?: {
      required?: boolean;
      maxLength?: number;
    };
  };
}

function EditableTextarea({
  placeholder,
  formHandler,
  className,
  height,
  notValidation,
  registerForm,
  control,
}: Props): ReactElement {
  const {
    field: { onChange },
  } = useController({
    name: registerForm.name,
    control,
    rules: registerForm.config,
  });

  return (
    <EditableArea
      className={classnames('editable-textarea', className)}
      contentEditable
      height={height}
      notValidation={notValidation}
      placeholder={placeholder}
      onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
        onChange(e.target.innerText);
        formHandler && formHandler(e.target.innerText);
      }}
    />
  );
}

const EditableArea = styled.div<{ height?: string; notValidation?: boolean }>`
  box-sizing: border-box;
  width: auto;
  height: ${props => props.height || 'auto'};
  padding: 1.6rem 1.6rem 2.4rem 1.6rem;

  border: 1px solid
    ${({ notValidation }) => (notValidation ? '#ff5638' : COLOR.GREY_400)};
  border-radius: 0.6rem;

  color: ${COLOR.TEXT_BLACK};
  caret-color: ${COLOR.LIGHT_GREEN};
  overflow-y: auto;

  &:focus {
    outline: none !important;
    border: 1px solid
      ${({ notValidation }) => (notValidation ? '#ff5638' : COLOR.LIGHT_GREEN)};
  }
  &[placeholder]:empty::before {
    content: attr(placeholder);
    color: ${COLOR.PLACEHOLDER_GREY};
  }
`;

export default EditableTextarea;
