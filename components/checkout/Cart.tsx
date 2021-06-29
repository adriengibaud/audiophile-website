import styled from 'styled-components';
import CartItem from '../cart/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from 'app/reducers/cartReducer';

const Cart = () => {
  const cart = useSelector(selectCart);
  const totalPrice = () => {
    let price = 0;
    cart.map((item) => {
      let itemTotal = item.price * item.quantity;
      price += itemTotal;
    });
    return price;
  };

  return (
    <Container>
      <Title>summary</Title>
      {cart.length > 0 ? (
        <>
          <ItemsContainer>
            {cart.map((e) => {
              return <CartItem summary={true} item={e} />;
            })}
          </ItemsContainer>
          <PriceInfosContainer>
            <PriceInfos>
              <PriceTitle>total</PriceTitle>
              <Price>$ {totalPrice()}</Price>
            </PriceInfos>
            <PriceInfos>
              <PriceTitle>shipping</PriceTitle>
              <Price>$ 50</Price>
            </PriceInfos>
            <PriceInfos>
              <PriceTitle>vat (included)</PriceTitle>
              <Price>$ {Math.round(totalPrice() * 0.2)}</Price>
            </PriceInfos>
            <PriceInfos>
              <PriceTitle>grand total</PriceTitle>
              <Price primary>$ {totalPrice() + 50}</Price>
            </PriceInfos>
          </PriceInfosContainer>
        </>
      ) : (
        <EmptyCart>Your cart is empty</EmptyCart>
      )}
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h6``;

const EmptyCart = styled.p`
  font: 20px Manrope;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemsContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  section:not(:first-child) {
    margin-top: 15px;
  }
`;

const PriceInfosContainer = styled.div`
  margin: 40px 0;
  div:not(:first-child) {
    margin-top: 10px;
  }
  div:last-child {
    margin-top: 30px;
  }
`;

const PriceInfos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PriceTitle = styled.p`
  font: 15px Manrope;
  line-height: 25px;
  opacity: 50%;
`;

const Price = styled.p<{ primary?: boolean }>`
  font: 18px Manrope;
  font-weight: bold;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.black};
`;
