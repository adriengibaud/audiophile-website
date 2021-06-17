import Button from 'components/Button';
import Head from 'next/head';
import { createClient } from 'contentful';
import Link from 'next/link';
import Categories from 'sections/Categories';
import Header from 'sections/Header';
import Highlight from 'sections/Highlight';
import Brand from 'sections/Brand';

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

  return {
    props: {
      contentTypes: contentTypes.items,
      categoriesData: categoriesData.items,
      headerData: headerData.items[0],
      fullSizeHighlight: fullSizeHighlight.items[0],
      mediumSizeHighlight: mediumSizeHighlight.items[0],
      smallSizeHighlight: smallSizeHighlight.items[0],
      brandData: brandData,
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
}) {
  console.log(brandData);
  return (
    <div>
      {/* {contentTypes
        .filter((p) => p.description === 'products')
        .map((e) => (
          <Link key={e.sys.id} href={'/products/' + e.sys.id}>
            <a>{e.name}</a>
          </Link>
        ))}*/}
      <Header data={headerData} />
      <Categories categories={categoriesData} />
      <Highlight
        fullSizeData={fullSizeHighlight}
        mediumSizeHighlight={mediumSizeHighlight}
        smallSizeHighlight={smallSizeHighlight}
      />
      <Brand />
    </div>
  );
}
