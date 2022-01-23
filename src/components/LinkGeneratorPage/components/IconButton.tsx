import React from 'react';

import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';

type IconButtonProps = {
  show: boolean;
  icon: string;
  text: string;
  onClick?: () => void;
  className?: string;
};

const IconButton = ({
  show,
  icon,
  text,
  onClick,
  className,
}: IconButtonProps) => {
  return (
    <IconButtonWrapper show={show} className={className} onClick={onClick}>
      <img src={icon} />
      <Text>{text}</Text>
    </IconButtonWrapper>
  );
};

const showButton = keyframes`
  0% {
    opacity: 0;
  }

  100%{
    opacity: 1;
  }
`;

const hideButton = keyframes`
  0% {
    opacity: 1;
  }

  100%{
    opacity: 0;
  }
`;

const IconButtonWrapper = styled.div<{ show: boolean }>`
  padding: 0.85rem 0.6rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  animation: ${({ show }) => (show ? showButton : hideButton)} 0.2s forwards;
`;

const Text = styled.span`
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02rem;
  margin-left: 0.4rem;
`;

export default IconButton;
