import { ProductCart } from '@/types/productCart';
import styled from 'styled-components';
import Image from 'next/image';
import QuantityButton from '../QuantityButton';
import { useDispatch } from 'react-redux';
import { add, remove } from 'app/reducers/cartReducer';

const CartItem = ({ item }: { item: ProductCart }) => {
  const { name, productImage, category, price, quantity, slug } = item;
  const dispatch = useDispatch();

  const removeCategory = () => {
    let nameNoCat = '';
    if (category === 'speaker') nameNoCat = name.split('speaker')[0];
    else if (category === 'earphone') nameNoCat = name.split('earphones')[0];
    else if (category === 'headphone') nameNoCat = name.split('headphones')[0];
    return nameNoCat.slice(0, -1);
  };

  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https:${productImage}`}
          layout='fill'
          objectFit='cover'
          quality={10}
          className='image'
        />
      </ImageContainer>
      <InfosContainer>
        <Title>{removeCategory()}</Title>
        <Price>$ {price}</Price>
      </InfosContainer>
      <QuantityButton
        variant={2}
        quantity={quantity}
        decreaseHandler={() => dispatch(remove({ slug }))}
        addHandler={() => dispatch(add({ slug, quantity: 1 }))}
      />
    </Container>
  );
};

export default CartItem;

const Container = styled.section`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  .image {
    border-radius: 8px;
  }
`;

const InfosContainer = styled.div`
  height: 100%;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  font: 15px Manrope;
  font-weight: bold;
  line-height: 25px;
`;

const Price = styled.p`
  font: 14px Manrope;
  font-weight: bold;
  opacity: 70%;
`;
