import { createClient } from 'contentful';
import Link from 'next/link';
import safeJsonStringify from 'safe-json-stringify';

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
  return {
    props: {
      product: data,
      category: params.category,
      categoriesData: categoriesData.items,
    },
    revalidate: 1,
  };
}

const Categories = ({ product, category }) => {
  console.log(product);
  return (
    <>
      <div>{category}</div>
      <div>{product.items[0].fields.title}</div>
    </>
  );
};

export default Categories;
