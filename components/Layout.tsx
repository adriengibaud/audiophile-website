import { GlobalStyle } from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
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
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NavBar categoriesData={categoriesData} />
        {children}
        <Footer footerData={footerData} />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
