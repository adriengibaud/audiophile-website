import styled from 'styled-components';
import { useState } from 'react';

const Input = ({
  value,
  onChange,
  size,
  label,
  type,
  checked,
  status,
}: {
  value: string | number | string[];
  onChange: Function;
  size: string;
  label: string;
  type: string;
  checked?: boolean;
  status?: string;
}) => {
  return (
    <Container size={size}>
      {type === 'text' && (
        <Label type={type}>
          {label}
          <Box
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Label>
      )}
      {type === 'radio' && (
        <RadioBox size={size} checked={checked} onClick={() => onChange(value)}>
          <RadioButton
            checked={checked}
            type='radio'
            value={value}
            onChange={() => onChange(value)}
          />
          <Label type={type}>{label} </Label>
        </RadioBox>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div<{ size: string }>`
  width: ${({ size }) => (size === 'full' ? '100%' : '48%')};
  @media screen and (max-width: 689px) {
    width: 100%;
  }
`;

const Label = styled.label<{ type: string }>`
  font: 12px Manrope;
  font-weight: bold;
  letter-spacing: -0.21px;
`;

const RadioBox = styled.div<{ size: string; checked: boolean }>`
  width: 100%;
  height: 56px;
  border: 2px solid
    ${({ theme, checked }) =>
      checked ? theme.colors.primary : theme.colors.secondaryLight};
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
`;

const RadioButton = styled.input`
  width: 22px;
  height: 22px;
  margin: 0 20px 0 20px;
  :after {
    content: '';
    width: 22px;
    height: 22px;
    background: white;
    position: absolute;
    transform: translate(-1px -1px);
    z-index: 10;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  :checked:after {
    content: '';
    width: 22px;
    height: 22px;
    background: rgb(255, 255, 255);
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 0%,
      rgba(216, 125, 74, 1) 0%,
      rgba(216, 125, 74, 1) 38%,
      rgba(255, 255, 255, 1) 38%
    );
    z-index: 10;
    border-radius: 50%;
    transform: translate(-1px -1px);
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const Box = styled.input`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 5px;
  padding: 0 15px;
  color: rgba(0, 0, 0, 0.5);
  :focus {
    outline: none !important;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
