import styled from 'styled-components';
import { useState } from 'react';
import CartItem from '@/components/cart/CartItem';
import { FiCheck } from 'react-icons/fi';
import { ProductCart } from '@/types/productCart';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

const OrderConfirmation = ({
  cartItem,
  totalPrice,
}: {
  cartItem: ProductCart[];
  totalPrice: number;
}) => {
  const [cartDisplay, setCartDisplay] = useState(1);
  const router = useRouter();

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
        <Subtitle>
          You will receive an email confirmation shortly. (no)
        </Subtitle>
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
          <Total>
            <TotalTitle>grand total</TotalTitle>
            <TotalPrice>$ {totalPrice + 50}</TotalPrice>
          </Total>
        </ItemsRecap>
        <Button
          variant={4}
          text='back to home'
          clickHandler={() => router.push('/')}
        />
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
  margin: 70px auto 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 689px) {
    width: 327px;
  }
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
  margin-bottom: 35px;
  .icon {
    color: white;
    font-size: 40px;
  }
  @media screen and (max-width: 689px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h3`
  width: 294px;
  margin-bottom: 35px;
  @media screen and (max-width: 689px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Subtitle = styled.p`
  font: 15px Manrope;
  opacity: 50%;
  margin-bottom: 35px;
  @media screen and (max-width: 689px) {
    margin-bottom: 20px;
  }
`;

const ItemsRecap = styled.div`
  min-height: 140px;
  width: 100%;
  display: flex;
  margin-bottom: 35px;
  @media screen and (max-width: 689px) {
    margin-bottom: 20px;
    flex-direction: column;
  }
`;

const ItemsList = styled.div`
  width: 60%;
  min-height: 140px;
  background: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 8px 0 0 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 689px) {
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
`;

const ShowMoreButton = styled.button`
  width: 100%;
  height: 36px;
  border-top: 1px solid grey;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Total = styled.div`
  width: 40%;
  background: ${({ theme }) => theme.colors.black};
  border-radius: 0 8px 8px 0;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  @media screen and (max-width: 689px) {
    width: 100%;
    border-radius: 0 0 8px 8px;
    height: 80px;
  }
`;

const TotalTitle = styled.p`
  font: 15px Manrope;
  line-height: 25px;
  text-transform: uppercase;
  opacity: 50%;
`;

const TotalPrice = styled.p`
  font: 18px Manrope;
  line-height: 25px;
`;
