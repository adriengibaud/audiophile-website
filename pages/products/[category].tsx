import { createClient } from 'contentful';
import Link from 'next/link';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getContentTypes();

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
  const { items } = await client.getEntries({
    content_type: params.category,
  });
  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  console.log(items);
  return {
    props: { product: items, categoriesData: categoriesData.items },
  };
}

const Categories = ({ product }) => {
  console.log(product);
  return (
    <>
      <h1>{product[0].fields.title}</h1>
      <h1>content id : {product[0].sys.contentType.sys.id}</h1>
      <Link
        href={
          '/products/' +
          product[0].sys.contentType.sys.id +
          '/' +
          product[0].fields.slug
        }
      >
        <a>Click to see it</a>
      </Link>
    </>
  );
};

export default Categories;
