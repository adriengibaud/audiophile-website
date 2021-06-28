import styled from 'styled-components';

const QuantityButton = ({
  addHandler,
  decreaseHandler,
  quantity,
  variant,
}: {
  addHandler: Function;
  decreaseHandler: Function;
  quantity: number;
  variant: number;
}) => {
  const decreaseQuantity = () => {
    if (quantity > 0) decreaseHandler();
  };

  return (
    <Container variant={variant}>
      <Button onClick={() => decreaseQuantity()}>-</Button>
      {quantity}
      <Button onClick={() => addHandler()}>+</Button>
    </Container>
  );
};

export default QuantityButton;

const Container = styled.div<{ variant: number }>`
  width: ${({ variant }) =>
    (variant === 1 && '120px') || (variant === 2 && '96px')};
  height: ${({ variant }) =>
    (variant === 1 && '48px') || (variant === 2 && '32px')};
  background: ${({ theme }) => theme.colors.secondaryLight};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font: 25px Manrope;
`;
