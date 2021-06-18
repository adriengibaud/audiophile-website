import { createClient } from 'contentful';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';

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
  const data = rawData.items.filter((e) =>
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
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const rawItems = await client.getEntries({
    content_type: params.category,
    'fields.slug': params.slug,
  });
  const stringifiedData = safeJsonStringify(rawItems);
  const data = JSON.parse(stringifiedData);

  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  return {
    props: { object: data, categoriesData: categoriesData.items },
  };
}

const ProductDetails = ({ object }) => {
  console.log(object);
  return <div>yoyoyo</div>;
};

export default ProductDetails;
