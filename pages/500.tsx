import { createClient } from 'contentful';
import safeJsonStringify from 'safe-json-stringify';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticProps() {
  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  const footerData = await client.getEntries({
    content_type: 'footer',
  });
  return {
    props: {
      categoriesData: categoriesData.items,
      footerData: footerData.items[0],
    },
    revalidate: 1,
  };
}

const Custom500 = () => {
  return <div>500</div>;
};

export default Custom500;
