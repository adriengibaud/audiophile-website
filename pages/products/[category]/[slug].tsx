import { createClient } from 'contentful';
import axios from 'axios';

export type Item = {
  fields: {
    description: string;
    features: string;
    gallery: [];
    imageProductDesktop: {};
    imageProductMobile: {};
    imageProductTablet: {};
    price: number;
    slug: string;
    title: string;
  };
  sys: {
    contentType: {
      sys: {
        id: string;
      };
    };
  };
};
export async function getAllData() {
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
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const categoriesTemp = ['headphone', 'earphone', 'speaker', 'product'];
  const product = await getAllData();
  const productFiltered = product.items.filter((e) =>
    categoriesTemp.includes(e.sys.contentType.sys.id)
  );

  const paths = productFiltered.map((item) => {
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
  const { items } = await client.getEntries({
    content_type: params.category,
    'fields.slug': params.slug,
  });

  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  return {
    props: { object: items, categoriesData: categoriesData.items },
  };
}

const ProductDetails = ({ object }) => {
  console.log(object[0]);
  return <div>yoyoyo</div>;
};

export default ProductDetails;
