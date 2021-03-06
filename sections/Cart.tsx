import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeAll, selectCart } from 'app/reducers/cartReducer';
import Button from '@/components/Button';
import CartItem from '@/components/cart/CartItem';
import { useRouter } from 'next/router';

const Cart = ({
  cartOpen,
  clickHandler,
}: {
  cartOpen: boolean;
  clickHandler: Function;
}) => {
  const router = useRouter();
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let price = 0;
    cart.map((item) => {
      let itemTotal = item.price * item.quantity;
      price += itemTotal;
    });
    return price;
  };

  return (
    <Container onClick={() => clickHandler()} cartOpen={cartOpen}>
      <CartContainer onClick={(e) => e.stopPropagation()}>
        <Body>
          <TopSection>
            <CartTitle>cart ({cart.length})</CartTitle>
            <RemoveItems onClick={() => dispatch(removeAll())}>
              Remove all
            </RemoveItems>
          </TopSection>
          <ItemSection>
            {cart.map((item) => {
              return <CartItem summary={false} key={item.slug} item={item} />;
            })}
          </ItemSection>
          <TotalContainer>
            <TotalTitle>total</TotalTitle>
            <TotalPrice>$ {totalPrice()}</TotalPrice>
          </TotalContainer>
          <Button
            variant={4}
            text='checkout'
            clickHandler={() => {
              clickHandler();
              router.push('/checkout/');
            }}
          />
        </Body>
      </CartContainer>
    </Container>
  );
};

export default Cart;

const Container = styled.div<{ cartOpen: boolean }>`
  opacity: ${({ cartOpen }) => (cartOpen === true ? '100%' : '0%')};
  visibility: ${({ cartOpen }) => (cartOpen === true ? 'visible' : 'hidden')};
  transition: visibility 0.2s linear, opacity 0.2s linear;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: calc(100vh - 100px);
  z-index: 110000;
`;

const CartContainer = styled.div`
  position: absolute;
  width: 377px;
  height: auto;
  min-height: 400px;
  max-height: 80vh;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  transform: translate(65vw, 30px);
  @media screen and (max-width: 1110px) {
    transform: translate(46vw, 30px);
  }
  @media screen and (max-width: 700px) {
    transform: translate(0, 30px);
    right: 10px;
    width: calc(100vw - 20px);
  }
`;

const Body = styled.div`
  width: 337px;
  height: 100%;
  margin: 20px;
  @media screen and (max-width: 700px) {
    margin: 15px auto;
    width: 307px;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CartTitle = styled.h6``;

const RemoveItems = styled.button`
  font: 15px Manrope;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 70%;
  transition: linear 0.2s color, linear 0.2 opacity;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 100%;
  }
`;

const ItemSection = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  min-height: 195px;

  overflow-y: auto;
  width: 100%;
  section:not(:first-child) {
    margin-top: 15px;
  }
  @media screen and (max-width: 1110px) {
    max-height: 50vh;
  }
`;

const TotalContainer = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`;

const TotalTitle = styled.p`
  font: 15px Manrope;
  line-height: 25px;
  text-transform: uppercase;
`;

const TotalPrice = styled.p`
  font: 18px Manrope;
  font-weight: bold;
  line-height: 25px;
  text-align: right;
`;
