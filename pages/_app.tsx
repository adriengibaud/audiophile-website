import { createClient } from 'contentful';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  return (
    <Layout categoriesData={pageProps.categoriesData}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
