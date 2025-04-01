import { FC } from 'react';
import styled from 'styled-components';

interface DoorButtonProps {
  name: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  width: 110px;
  height: 202px;
  border: 2px solid #000;
  background: white;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

export const DoorButton: FC<DoorButtonProps> = ({ name, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {name}
    </StyledButton>
  );
}; 