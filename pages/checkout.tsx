import styled from 'styled-components';
import { useState } from 'react';
import { createClient } from 'contentful';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@/components/Input';
import { selectCart } from 'app/reducers/cartReducer';
import Cart from '@/components/checkout/Cart';
import Button from '@/components/Button';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticProps() {
  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  const footerData = await client.getEntries({
    content_type: 'footer',
  });
  return {
    props: {
      categoriesData: categoriesData.items,
      footerData: footerData.items[0],
    },
    revalidate: 1,
  };
}

const checkout = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    adress: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: '',
    eMoneyNumber: '',
    eMoneyPin: '',
  });
  const cart = useSelector(selectCart);

  const calcSummarySize = () => {
    if (cart.length > 0) {
      return 360 + 10 + 79 * cart.length;
    } else return 140;
  };
  console.log(calcSummarySize());
  return (
    <Body>
      <BackButton>Go Back</BackButton>
      <Container>
        <CheckOutContainer>
          <Title>checkout</Title>
          <form>
            <CheckoutPart>
              <PartTitle>billing details</PartTitle>
              <Input
                label='Name'
                value={state.name}
                onChange={(e) => setState({ ...state, name: e })}
                size='half'
                type='text'
              />
              <Input
                label='Email Adress'
                value={state.email}
                onChange={(e) => setState({ ...state, email: e })}
                size='half'
                type='text'
              />
              <Input
                label='Phone Number'
                value={state.phone}
                onChange={(e) => setState({ ...state, phone: e })}
                size='half'
                type='text'
              />
            </CheckoutPart>
            <CheckoutPart>
              <PartTitle>shipping info</PartTitle>
              <Input
                label='Adress'
                value={state.adress}
                onChange={(e) => setState({ ...state, adress: e })}
                size='full'
                type='text'
              />
              <Input
                label='ZIP code'
                value={state.zipCode}
                onChange={(e) => setState({ ...state, zipCode: e })}
                size='half'
                type='text'
              />
              <Input
                label='City'
                value={state.city}
                onChange={(e) => setState({ ...state, city: e })}
                size='half'
                type='text'
              />
              <Input
                label='Country'
                value={state.country}
                onChange={(e) => setState({ ...state, country: e })}
                size='half'
                type='text'
              />
            </CheckoutPart>
            <CheckoutPart>
              <PartTitle>payment details</PartTitle>
              <Label>Payment Method</Label>

              <PaymentMethodContainer>
                <Input
                  type='radio'
                  onChange={(e) => setState({ ...state, paymentMethod: e })}
                  label='e-Money'
                  value='emoney'
                  size='half'
                  checked={state.paymentMethod === 'emoney' ? true : false}
                />
                <Input
                  type='radio'
                  onChange={(e) => setState({ ...state, paymentMethod: e })}
                  label='Cash on Delivery'
                  value='cash'
                  size='half'
                  checked={state.paymentMethod === 'cash' ? true : false}
                />
              </PaymentMethodContainer>

              {state.paymentMethod === 'emoney' && (
                <PaymentInfos>
                  <Input
                    label='e-Money Number'
                    value={state.eMoneyNumber}
                    onChange={(e) => setState({ ...state, eMoneyNumber: e })}
                    size='half'
                    type='text'
                  />
                  <Input
                    label='e-Money PIN'
                    value={state.eMoneyPin}
                    onChange={(e) => setState({ ...state, eMoneyPin: e })}
                    size='half'
                    type='text'
                  />
                </PaymentInfos>
              )}
            </CheckoutPart>
          </form>
        </CheckOutContainer>
        <SummaryContainer size={calcSummarySize()}>
          <Cart />
          {cart.length > 0 && (
            <Button
              variant={4}
              text='checkout'
              clickHandler={() => {
                console.log('yoyo');
              }}
            />
          )}
        </SummaryContainer>
      </Container>
    </Body>
  );
};

export default checkout;

const Body = styled.div`
  background: ${({ theme }) => theme.colors.secondaryLight};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BackButton = styled.button`
  width: 1110px;
  margin: 60px auto 0 auto;
  font: 15px Manrope;
  line-height: 25px;
  opacity: 50%;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
  }
`;

const Container = styled.div`
  margin: 30px auto 100px auto;
  width: 1110px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    flex-direction: column;
    margin: 30px auto 100px auto;
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
  }
`;

const Title = styled.h3``;

const CheckOutContainer = styled.section`
  width: 730px;
  height: auto;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 40px;
  @media screen and (max-width: 1110px) {
    width: 100%;
  }
`;

const SummaryContainer = styled.section<{ size: number }>`
  padding: 30px;
  width: 350px;
  height: ${({ size }) => `${size}px`};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  @media screen and (max-width: 1110px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const CheckoutPart = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Label = styled.label`
  font: 12px Manrope;
  font-weight: bold;
  letter-spacing: -0.21px;
  width: 100%;
`;

const PartTitle = styled.p`
  width: 100%;
  font: 13px Manrope;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.93px;
  line-height: 25px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const PaymentMethodContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  flex-wrap: wrap;

  @media screen and (max-width: 689px) {
    height: 132px;
    flex-direction: column;
  }
`;

const PaymentInfos = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
