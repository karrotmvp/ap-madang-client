import React, { ReactElement, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface Props {
  placeholder?: string;
}

const Input = styled.textarea`
  width: 100%;
  min-height: 2rem;
  max-height: 8rem;
  overflow: hidden;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #a6aaae;
  color: #111111;
  caret-color: #70bb78;

  font-size: 1.7rem;
  font-family: 'Pretendard';
  line-height: 2.04rem;
  letter-spacing: -2%;
  padding-bottom: 0.8rem;
  margin-top: 8rem;
  resize: none;

  &::placeholder {
    color: #c6c9cc;
  }

  &:focus {
    outline: none;
  }
`;

function ResizingTextArea({ placeholder }: Props): ReactElement {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '2rem';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '2rem';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, [ref]);

  return (
    <Input
      rows={1}
      placeholder={placeholder}
      ref={ref}
      onInput={handleResizeHeight}
    />
  );
}

export default ResizingTextArea;
