import { useState } from 'react';
import { createClient } from 'contentful';
import styled from 'styled-components';
import safeJsonStringify from 'safe-json-stringify';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { EntryType } from '@/types/entry';
import { CategoryTypes } from '@/types/category';
import Button from '@/components/Button';
import QuantityButton from '@/components/QuantityButton';
import ProductGallery from 'sections/ProductGallery';
import MayLikeProduct from 'sections/MayLikeProduct';
import Categories from 'sections/Categories';
import { BrandType } from '@/types/brand';
import Brand from 'sections/Brand';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const categories = await client.getContentTypes({
    description: 'products',
  });
  const filterList = categories.items.map((e) => e.sys.id);
  const res = await client.getEntries();
  const stringifiedData = safeJsonStringify(res);
  const rawData = JSON.parse(stringifiedData);
  const data = await rawData.items.filter((e) =>
    filterList.includes(e.sys.contentType.sys.id)
  );

  const paths = await data.map((item) => {
    return {
      params: {
        category: item.sys.contentType.sys.id,
        slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const rawItems = await client.getEntries({
    content_type: params.category,
    'fields.slug': params.slug,
  });
  const stringifiedData = await safeJsonStringify(rawItems);
  const data = await JSON.parse(stringifiedData);
  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  const footerData = await client.getEntries({
    content_type: 'footer',
  });
  const brandData = await client.getEntries({
    content_type: 'brandDescription',
  });
  return {
    props: {
      object: data.items[0],

      categoriesData: categoriesData.items,
      footerData: footerData.items[0],
      brandData: brandData.items[0],
    },
  };
}

const ProductDetails = ({
  object,
  categoriesData,
  brandData,
}: {
  object: EntryType;
  categoriesData: CategoryTypes[];
  brandData: BrandType;
}) => {
  const [quantity, setQuantity] = useState(0);

  console.log(object);
  const router = useRouter();

  const addAmount = () => setQuantity(quantity + 1);
  const decreaseAmount = () => setQuantity(quantity - 1);
  const { inTheBox, features, gallery, link } = object.fields;

  return (
    <>
      <Container>
        <BackButton onClick={() => router.back()}>
          <a>Go Back</a>
        </BackButton>
        <TopContainer>
          <ImageContainer>
            <Image
              src={`https:${object.fields.productImage.fields.file.url}`}
              layout='fill'
              objectFit='cover'
              quality={100}
              className='image'
            />
          </ImageContainer>
          <InfosContainer>
            {object.fields.new && <NewProduct>new product</NewProduct>}
            <Title>{object.fields.title}</Title>
            <Description>{object.fields.description}</Description>
            <Price>$ {object.fields.price}</Price>
            <ActionContainer>
              <QuantityButton
                addHandler={() => addAmount()}
                decreaseHandler={() => decreaseAmount()}
                quantity={quantity}
              />
              <Button
                variant={1}
                text='add to cart'
                clickHandler={() => console.log('je met dans le panier')}
              />
            </ActionContainer>
          </InfosContainer>
        </TopContainer>
        <BottomContainer>
          <FeaturesContainer>
            <SectionTitle>features</SectionTitle>
            <Content>
              {features.content.map((feature, i) => {
                if (feature.nodeType === 'paragraph')
                  return (
                    <FeaturesParagraph key={i}>
                      {feature.content[0].value}
                    </FeaturesParagraph>
                  );
              })}
            </Content>
          </FeaturesContainer>
          <InTheBox>
            <SectionTitle>in the box</SectionTitle>
            <Content>
              {inTheBox.content.map((e, i) => {
                return (
                  <InTheBoxEntry key={i}>
                    <span className='quantity'>{e.content[0].value}</span>
                    <span className='item'>{e.content[1].value}</span>
                  </InTheBoxEntry>
                );
              })}
            </Content>
          </InTheBox>
        </BottomContainer>
        <ProductGallery gallery={gallery} />
        <MayLikeProduct link={link} />
      </Container>
      <Categories categories={categoriesData} />
      <Brand brandData={brandData} />
    </>
  );
};

export default ProductDetails;

const Container = styled.main`
  width: 1110px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
  }
`;

const BackButton = styled.button`
  a {
    font: 15px Manrope;
    line-height: 25px;
  }
  margin-bottom: 50px;
`;

const TopContainer = styled.div`
  height: 540px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1110px) {
    height: 480px;
  }
  @media screen and (max-width: 689px) {
    flex-direction: column;
    height: 700px;
  }
`;

const ImageContainer = styled.div`
  width: 560px;
  height: 100%;
  position: relative;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 1110px) {
    width: 281px;
    height: 90%;
  }
  @media screen and (max-width: 689px) {
    width: 100%;
    height: 327px;
  }
`;

const InfosContainer = styled.section`
  height: 407px;
  width: 445px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    width: 339.5px;
    height: 390px;
  }
  @media screen and (max-width: 689px) {
    margin-top: 30px;
    width: 100%;
  }
`;

const NewProduct = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font: 14px Manrope;
  letter-spacing: 10px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  @media screen and (max-width: 689px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font: 15px Manrope;
  line-height: 25px;
`;

const Price = styled.p`
  font: 18px Manrope;
  font-weight: bold;
  letter-spacing: 1.3px;
`;

const ActionContainer = styled.div`
  width: 300px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BottomContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 318px;
  margin-top: 100px;
  @media screen and (max-width: 1110px) {
    flex-direction: column;
    height: auto;
  }
`;

const InTheBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  @media screen and (max-width: 1110px) {
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 100px;
  }
  @media screen and (max-width: 689px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const InTheBoxEntry = styled.div`
  display: grid;
  grid-template-columns: 40px 250px;
  grid-template-rows: 35px;
  grid-template-areas: 'quantity item';
  font: 15px Manrope;
  .quantity {
    color: ${({ theme }) => theme.colors.primary};
    grid-area: 'quantity';
    font-weight: bold;
  }
  .item {
    grid-area: 'item';
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 30px;
`;

const FeaturesContainer = styled.div`
  width: 635px;

  p:not(:first-child) {
    margin-top: 15px;
  }
  @media screen and (max-width: 1110px) {
    width: 100%;
  }
`;

const FeaturesParagraph = styled.p`
  font: 15px Manrope;
  line-height: 25px;
`;
