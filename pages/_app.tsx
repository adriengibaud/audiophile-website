import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { theme } from 'styles/theme';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  console.log(pageProps);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout
          categoriesData={pageProps.categoriesData}
          footerData={pageProps.footerData}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
