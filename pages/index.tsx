import Button from 'components/Button';
import Head from 'next/head';
import { createClient } from 'contentful';
import Link from 'next/link';
import Categories from 'sections/Categories';
import Header from 'sections/Header';
import Highlight from 'sections/Highlight';
import Brand from 'sections/Brand';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';

export async function getAllData() {
  const res = await axios.get(
    'https://cdn.contentful.com/spaces/febpdaznqgsb/environments/master/entries?access_token=kYpKxaQf1BIzc9LH4HRnUrFeEwCMwm_Nx0hec_DC4Lg'
  );
  return res.data;
}

export async function getCategories() {
  const res = await axios.get(
    'https://cdn.contentful.com/spaces/febpdaznqgsb/environments/master/entries?access_token=kYpKxaQf1BIzc9LH4HRnUrFeEwCMwm_Nx0hec_DC4Lg&content_type=categories'
  );
  return res.data;
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  const contentTypes = await client.getContentTypes();
  const categoriesData = await client.getEntries({
    content_type: 'categories',
  });
  const headerData = await client.getEntries({
    content_type: 'header',
  });
  const fullSizeHighlight = await client.getEntries({
    content_type: 'fullsizeHighlight',
  });
  const mediumSizeHighlight = await client.getEntries({
    content_type: 'mediumSizeHighlight',
  });
  const smallSizeHighlight = await client.getEntries({
    content_type: 'smallSizeHighlight',
  });
  const brandData = await client.getEntries({
    content_type: 'brandDescription',
  });
  const firstTest = await client.getContentTypes({
    description: 'products',
  });
  const footerData = await client.getEntries({
    content_type: 'footer',
  });

  const tempCat = await client.getContentTypes({
    description: 'products',
  });
  const filterList = tempCat.items.map((e) => e.sys.id);
  const res = await client.getEntries();
  const stringifiedRes = safeJsonStringify(res);
  const rawData = JSON.parse(stringifiedRes);
  const data = rawData.items.filter((e) =>
    filterList.includes(e.sys.contentType.sys.id)
  );

  return {
    props: {
      contentTypes: contentTypes.items,
      categoriesData: categoriesData.items,
      headerData: headerData.items[0],
      fullSizeHighlight: fullSizeHighlight.items[0],
      mediumSizeHighlight: mediumSizeHighlight.items[0],
      smallSizeHighlight: smallSizeHighlight.items[0],
      brandData: brandData.items[0],
      firstTest,
      footerData: footerData.items[0],
      filterList,
      data,
    },
    revalidate: 1,
  };
}

export default function Home({
  contentTypes,
  categoriesData,
  headerData,
  fullSizeHighlight,
  mediumSizeHighlight,
  smallSizeHighlight,
  brandData,
  filterList,
  data,
}) {
  return (
    <>
      {/* {contentTypes
        .filter((p) => p.description === 'products')
        .map((e) => (
          <Link key={e.sys.id} href={'/products/' + e.sys.id}>
            <a>{e.name}</a>
          </Link>
        ))}*/}
      <Head>
        <title>Audiophile</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header data={headerData} />
      <Categories categories={categoriesData} />
      <Highlight
        fullSizeData={fullSizeHighlight}
        mediumSizeHighlight={mediumSizeHighlight}
        smallSizeHighlight={smallSizeHighlight}
      />
      <Brand brandData={brandData} />
    </>
  );
}
