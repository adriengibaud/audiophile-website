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
  width: ${({ variant }) => (variant === 4 ? '100%' : '160px;')};
  background: ${({ variant, theme }) =>
    (variant === 1 && theme.colors.primary) ||
    (variant === 2 && 'none') ||
    (variant === 3 && 'none') ||
    (variant === 4 && theme.colors.primary)};
  border: ${({ variant }) => variant === 2 && 'solid 1px black'};
  height: 48px;
  cursor: pointer;
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
    (variant === 3 && theme.colors.black) ||
    (variant === 4 && theme.colors.white)};
  transition: color 0.2s linear, background 0.2s linear;
  :hover {
    background: ${({ variant, theme }) =>
      (variant === 1 && theme.colors.primaryLight) ||
      (variant === 2 && theme.colors.black) ||
      (variant === 3 && 'none') ||
      (variant === 4 && theme.colors.primaryLight)};
    color: ${({ variant, theme }) =>
      (variant === 1 && theme.colors.white) ||
      (variant === 2 && theme.colors.white) ||
      (variant === 3 && theme.colors.primary) ||
      (variant === 4 && theme.colors.white)};
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
