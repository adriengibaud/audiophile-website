import { GlobalStyle } from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import NavBar from 'sections/NavBar';
import { CategoryTypes } from '@/types/category';

const Layout = ({
  children,
  categoriesData,
}: {
  children: JSX.Element;
  categoriesData: CategoryTypes[];
}) => {
  console.log(categoriesData);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NavBar categoriesData={categoriesData} />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default Layout;
