import styled from 'styled-components';
import ProductResult from '@/components/category/ProductResult';
import Head from 'next/head';
import { CategoryContentTypes, CategoryTypes } from '@/types/category';
import { createClient } from 'contentful';
import safeJsonStringify from 'safe-json-stringify';
import { useRouter } from 'next/router';
import Categories from 'sections/Categories';
import Brand from 'sections/Brand';
import { BrandType } from '@/types/brand';
import SeparationLine from 'components/SeparationLine';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getContentTypes({ description: 'products' });

  const paths = res.items.map((item) => {
    return {
      params: { category: item.sys.id },
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
  });
  const stringifiedData = safeJsonStringify(rawItems);
  const data = JSON.parse(stringifiedData);
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
      product: data,
      category: params.category,
      categoriesData: categoriesData.items,
      footerData: footerData.items[0],
      brandData: brandData.items[0],
    },
    revalidate: 1,
  };
}

const CategoriesResult = ({
  product,
  category,
  categoriesData,
  brandData,
}: {
  product: CategoryContentTypes;
  category: string;
  categoriesData: CategoryTypes[];
  brandData: BrandType;
}) => {
  const router = useRouter();
  console.log(product);
  console.log(category);

  const categoryTitle = () => {
    if (product.total > 1) {
      const categoryPlurial = category + 's';
      return categoryPlurial;
    } else return category;
  };

  const redirectToItem = (slug) => {
    console.log(category);
    router.push('/products/' + category + '/' + slug);
  };

  return (
    <>
      <Head>
        <title>Audiophile</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Mask>
        <SeparationLine />
        <Title>{categoryTitle()}</Title>
      </Mask>
      <ResultsContainer>
        {product.items.map((e, i) => (
          <ProductResult
            productData={e}
            index={i}
            clickHandler={(e) => redirectToItem(e)}
          />
        ))}
      </ResultsContainer>
      <Categories categories={categoriesData} />
      <Brand brandData={brandData} />
    </>
  );
};

export default CategoriesResult;

const Mask = styled.div`
  width: 100%;
  height: 236px;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
`;

const ResultsContainer = styled.section`
  margin-top: 100px;
  margin-bottom: 100px;
  section:nth-of-type(odd) {
    flex-direction: row;
  }
  section:not(:first-child) {
    margin-top: 100px;
  }
  @media screen and (max-width: 1110px) {
    flex-direction: column;
    section:nth-of-type(odd) {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 689px) {
    margin-top: 50px;
    margin-bottom: 50px;
    section:not(:first-child) {
      margin-top: 70px;
    }
  }
`;
