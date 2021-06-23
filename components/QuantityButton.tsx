import styled from 'styled-components';

const QuantityButton = ({
  addHandler,
  decreaseHandler,
  quantity,
}: {
  addHandler: Function;
  decreaseHandler: Function;
  quantity: number;
}) => {
  return (
    <Container>
      <Button onClick={() => decreaseHandler()}>-</Button>
      {quantity}
      <Button onClick={() => addHandler()}>+</Button>
    </Container>
  );
};

export default QuantityButton;

const Container = styled.div`
  width: 120px;
  height: 48px;
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
