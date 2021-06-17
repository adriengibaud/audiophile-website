import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries();
  const paths = res.items.map((item) => {
    console.log('cat is', item.sys.contentType.sys.id);
    return {
      params: {
        slug: item.fields.slug,
        category: item.sys.contentType.sys.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  console.log('params are', params);
  const { items } = await client.getEntries({
    content_type: params.category,
    'fields.slug': params.slug,
  });
  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  return {
    props: { object: items[0], categoriesData: categoriesData.items },
    revalidate: 1,
  };
}

const ProductDetails = ({ object }) => {
  console.log(object);
  return <div></div>;
};

export default ProductDetails;
