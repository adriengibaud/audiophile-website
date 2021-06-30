import styled from 'styled-components';
import { useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import { FiCheck } from 'react-icons/fi';
import { ProductCart } from '@/types/productCart';

const OrderConfirmation = ({ cartItem }: { cartItem: ProductCart[] }) => {
  const [cartDisplay, setCartDisplay] = useState(1);

  const moreItemText = () => {
    return cartItem.length - cartDisplay;
  };

  return (
    <Container>
      <Body>
        <IconContainer>
          <FiCheck className='icon' />
        </IconContainer>
        <Title>
          thank you <br /> for your order
        </Title>
        <Subtitle>You will receive an email confirmation shortly.</Subtitle>
        <ItemsRecap>
          <ItemsList>
            {cartItem.slice(0, cartDisplay).map((item) => {
              return <CartItem item={item} summary={true} />;
            })}
            {cartItem.length > cartDisplay && (
              <ShowMoreButton onClick={() => setCartDisplay(cartItem.length)}>
                and {moreItemText()} more item{moreItemText() > 1 && 's'}
              </ShowMoreButton>
            )}
          </ItemsList>
          <Total>yoyoyo</Total>
        </ItemsRecap>
      </Body>
    </Container>
  );
};

export default OrderConfirmation;

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  z-index: 1;
`;

const Body = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  width: 540px;
  min-height: 580px;
  margin: 70px auto 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .icon {
    color: white;
    font-size: 40px;
  }
`;

const Title = styled.h3`
  width: 294px;
`;

const Subtitle = styled.p`
  font: 15px Manrope;
  opacity: 50%;
`;

const ItemsRecap = styled.div`
  min-height: 140px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ItemsList = styled.div`
  width: 60%;
  min-height: 140px;
  background: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 8px 0 0 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const ShowMoreButton = styled.button`
  width: 100%;
  height: 46px;
  border-top: 1px solid red;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Total = styled.div`
  width: 40%;
  height: 100%;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 0 8px 8px 0;
`;
