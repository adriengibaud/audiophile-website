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

/*export async function getAllData() {
  const res = await axios.get(
    'https://cdn.contentful.com/spaces/febpdaznqgsb/environments/master/entries?access_token=kYpKxaQf1BIzc9LH4HRnUrFeEwCMwm_Nx0hec_DC4Lg'
  );
  return res.data;
}

export async function getCategories() {
  const res = await axios.get(
    'https://cdn.contentful.com/spaces/febpdaznqgsb/environments/master/entries?access_token=kYpKxaQf1BIzc9LH4HRnUrFeEwCMwm_Nx0hec_DC4Lg&content_type=product'
  );
  return res.data;
}*/

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
  return {
    props: {
      object: data.items[0],

      categoriesData: categoriesData.items,
      footerData: footerData.items[0],
    },
  };
}

const ProductDetails = ({
  object,
  categoriesData,
}: {
  object: EntryType;
  categoriesData: CategoryTypes[];
}) => {
  const [quantity, setQuantity] = useState(0);

  console.log(object);
  const router = useRouter();

  const addAmount = () => setQuantity(quantity + 1);
  const decreaseAmount = () => setQuantity(quantity - 1);

  return (
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
    </Container>
  );
};

export default ProductDetails;

const Container = styled.main`
  width: 1110px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  a {
    font: 15px Manrope;
    line-height: 25px;
  }
`;

const TopContainer = styled.div`
  height: 540px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 560px;
  height: 100%;
  position: relative;
  .image {
    border-radius: 8px;
  }
`;

const InfosContainer = styled.section`
  height: 407px;
  width: 445px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewProduct = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font: 14px Manrope;
  letter-spacing: 10px;
  text-transform: uppercase;
`;

const Title = styled.h2``;

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
