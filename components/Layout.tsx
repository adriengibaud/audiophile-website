import { GlobalStyle } from '../styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import NavBar from 'sections/NavBar';
import { CategoryTypes } from '@/types/category';
import Footer from 'sections/Footer';
import { FooterTypes } from '@/types/footer';

const Layout = ({
  children,
  categoriesData,
  footerData,
}: {
  children: JSX.Element;
  categoriesData: CategoryTypes[];
  footerData: FooterTypes;
}) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NavBar categoriesData={categoriesData} />
        {children}
        <Footer footerData={footerData} categoriesData={categoriesData} />
      </ThemeProvider>
    </>
  );
};

export default Layout;

const Container = styled.html`
  max-width: 100vw;
`;
