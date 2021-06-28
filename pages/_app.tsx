import { store } from 'app/store';
import { Provider } from 'react-redux';
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
        <Provider store={store}>
          <Layout
            categoriesData={pageProps.categoriesData}
            footerData={pageProps.footerData}
          >
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
