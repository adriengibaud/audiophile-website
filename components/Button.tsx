import { ButtonTypes } from 'types/button';
import styled from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';

const Button = ({ variant, text, clickHandler }: ButtonTypes) => {
  return (
    <ButtonContainer variant={variant} onClick={() => clickHandler()}>
      {text}
      {variant === 3 && (
        <div className='icon'>
          <RiArrowRightSLine />
        </div>
      )}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{ variant: number }>`
  width: 160px;
  background: ${({ variant, theme }) =>
    (variant === 1 && theme.colors.primary) ||
    (variant === 2 && theme.colors.white) ||
    (variant === 3 && 'none')};
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font: 13px Manrope;
  font-weight: bold;
  line-height: 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ variant, theme }) =>
    (variant === 1 && theme.colors.white) ||
    (variant === 2 && theme.colors.black) ||
    (variant === 3 && theme.colors.black)};
  transition: color 0.2s linear, background 0.2s linear;
  :hover {
    background: ${({ variant, theme }) =>
      (variant === 1 && theme.colors.primaryLight) ||
      (variant === 2 && theme.colors.black) ||
      (variant === 3 && 'none')};
    color: ${({ variant, theme }) =>
      (variant === 1 && theme.colors.white) ||
      (variant === 2 && theme.colors.white) ||
      (variant === 3 && theme.colors.primary)};
  }
  .icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
