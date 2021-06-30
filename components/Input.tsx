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
  name,
  error,
}: {
  value: string | number | string[];
  onChange: Function;
  size: string;
  label: string;
  type: string;
  checked?: boolean;
  status?: string;
  name?: string;
  error?: string;
}) => {
  return (
    <Container size={size}>
      {type === 'text' && (
        <Label type={type}>
          <span className='label'>
            {label} {error && <span className='error'>{error}</span>}
          </span>
          <Box
            error={error}
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Label>
      )}
      {type === 'radio' && (
        <RadioBox size={size} checked={checked} onClick={() => onChange(value)}>
          <RadioLabel>
            <span className='radio__input'>
              <RadioButton
                checked={checked}
                type='radio'
                value={value}
                onChange={() => onChange(value)}
                name={name}
              />
              <span className='radio__control'></span>
            </span>
            <span className='radio__label'>{label}</span>
          </RadioLabel>
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
  .label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .error {
      color: red;
    }
  }
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

const RadioLabel = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  .radio__input {
    display: flex;
    input + .radio__control::before {
      content: '';
      width: 0.6em;
      height: 0.6em;
      box-shadow: inset 0.5em 0.5em ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      transition: 180ms transform ease-in-out;
      transform: scale(0);
    }
    input:checked + .radio__control::before {
      transform: scale(1);
    }
    .radio__control {
      display: grid;
      place-items: center;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 0.1em solid ${({ theme }) => theme.colors.primary};
      transform: translateY(-0.05em);
    }
  }
  .radio__label {
    font: 12px Manrope;
    font-weight: bold;
    letter-spacing: -0.21px;
    line-height: 1;
  }
`;

const RadioButton = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Box = styled.input<{ error: string | null }>`
  width: 100%;
  height: 56px;
  border: 2px solid
    ${({ theme, error }) => (error ? 'red' : theme.colors.secondaryLight)};
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
