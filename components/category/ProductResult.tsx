import { EntryType } from '@/types/entry';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Button';

const ProductResult = ({
  productData,
  index,
  clickHandler,
}: {
  productData: EntryType;
  index: number;
  clickHandler: Function;
}) => {
  return (
    <Container index={index}>
      <ImageContainer onClick={() => clickHandler(productData.fields.slug)}>
        <Image
          src={`https:${productData.fields.productImage.fields.file.url}`}
          layout='fill'
          objectFit='contain'
          quality={100}
          className='image'
          alt='product image'
        />
      </ImageContainer>
      <InfosContainer>
        {productData.fields.new && <NewProduct>new product</NewProduct>}
        <Title>{productData.fields.title}</Title>
        <Description>{productData.fields.description}</Description>
        <Button
          variant={1}
          text='see product'
          clickHandler={() => clickHandler(productData.fields.slug)}
        />
      </InfosContainer>
    </Container>
  );
};

export default ProductResult;

const Container = styled.section<{ index: number }>`
  width: 1100px;
  height: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1110px) {
    flex-direction: column;
    width: 689px;
    height: 756px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  width: 540px;
  height: 100%;
  position: relative;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 8px;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 1110px) {
    width: 689px;
    height: 352px;
  }
  @media screen and (max-width: 689px) {
    width: 100%;
    height: 352px;
  }
`;

const InfosContainer = styled.div`
  width: 445px;
  height: 343px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    height: 42%;
    width: 100%;
    text-align: center;
    align-items: center;
  }
  @media screen and (max-width: 689px) {
    width: 100%;
    height: auto;
    margin-top: 40px;
  }
`;

const NewProduct = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font: 14px Manrope;
  letter-spacing: 10px;
  text-transform: uppercase;
  @media screen and (max-width: 689px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h2`
  width: 65%;
  @media screen and (max-width: 689px) {
    width: 90%;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Description = styled.p`
  opacity: 60%;
  @media screen and (max-width: 689px) {
    width: 80%;
    font-size: 15px;
    margin-bottom: 20px;
  }
`;
