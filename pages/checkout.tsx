import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@/components/Input';
import { selectCart } from 'app/reducers/cartReducer';
import Cart from '@/components/checkout/Cart';
import Button from '@/components/Button';
import checkoutValidation from 'utils/checkoutValidation';
import { CheckoutInformationsType } from '@/types/checkoutInformations';
import OrderConfirmation from 'sections/OrderConfirmation';

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
  const [state, setState] = useState<CheckoutInformationsType>({
    name: '',
    email: '',
    phone: '',
    adress: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'emoney',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  const [validated, setValidated] = useState<string | boolean>();

  const [error, setError] = useState({
    name: null,
    email: null,
    phone: null,
    adress: null,
    zipCode: null,
    city: null,
    country: null,
    eMoneyNumber: null,
    eMoneyPin: null,
  });

  const validation = () => {
    setValidated('pending');
    setError(checkoutValidation(state));
    window.scrollTo(0, 0);
  };

  const cart = useSelector(selectCart);

  const calcSummarySize = () => {
    if (cart.length > 0) {
      return 360 + 10 + 79 * cart.length;
    } else return 140;
  };
  console.log(error);

  const totalPrice = () => {
    let price = 0;
    cart.map((item) => {
      let itemTotal = item.price * item.quantity;
      price += itemTotal;
    });
    return price;
  };

  useEffect(() => {
    if (validated === 'pending') {
      if (!Object.keys(error).every((e) => error[e] === null))
        setValidated(false);
      else setValidated(true);
    }
  }, [error]);

  return (
    <>
      {validated === true && (
        <OrderConfirmation cartItem={cart} totalPrice={totalPrice()} />
      )}
      <Body validated={validated}>
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
                  error={error.name}
                />
                <Input
                  label='Email Adress'
                  value={state.email}
                  onChange={(e) => setState({ ...state, email: e })}
                  size='half'
                  type='text'
                  error={error.email}
                />
                <Input
                  label='Phone Number'
                  value={state.phone}
                  onChange={(e) => setState({ ...state, phone: e })}
                  size='half'
                  type='text'
                  error={error.phone}
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
                  error={error.adress}
                />
                <Input
                  label='ZIP code'
                  value={state.zipCode}
                  onChange={(e) => setState({ ...state, zipCode: e })}
                  size='half'
                  type='text'
                  error={error.zipCode}
                />
                <Input
                  label='City'
                  value={state.city}
                  onChange={(e) => setState({ ...state, city: e })}
                  size='half'
                  type='text'
                  error={error.city}
                />
                <Input
                  label='Country'
                  value={state.country}
                  onChange={(e) => setState({ ...state, country: e })}
                  size='half'
                  type='text'
                  error={error.country}
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
                      name='radio'
                      error={error.eMoneyNumber}
                    />
                    <Input
                      label='e-Money PIN'
                      value={state.eMoneyPin}
                      onChange={(e) => setState({ ...state, eMoneyPin: e })}
                      size='half'
                      type='text'
                      name='radio'
                      error={error.eMoneyPin}
                    />
                  </PaymentInfos>
                )}
              </CheckoutPart>
            </form>
          </CheckOutContainer>
          <SummaryContainer size={calcSummarySize()}>
            <Cart totalPrice={totalPrice()} />
            {cart.length > 0 && (
              <Button
                variant={4}
                text='checkout'
                clickHandler={() => {
                  validation();
                }}
              />
            )}
          </SummaryContainer>
        </Container>
      </Body>
    </>
  );
};

export default checkout;

const Body = styled.div<{ validated }>`
  background: ${({ theme }) => theme.colors.secondaryLight};
  display: flex;
  flex-direction: column;
  height: 100%;
  filter: ${({ validated }) => validated === true && 'brightness(50%)'};
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
