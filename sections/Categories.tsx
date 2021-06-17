import Category from '@/components/Category';
import styled from 'styled-components';
import { CategoryTypes } from 'types/category';

const Categories = ({ categories }: { categories: CategoryTypes[] }) => {
  return (
    <Container>
      {categories.map((e: CategoryTypes) => (
        <Category key={e.sys.id} category={e} />
      ))}
    </Container>
  );
};

export default Categories;

const Container = styled.section`
  display: flex;
  flex-direction: row;
  min-width: 900px;
  max-width: 1100px;
  height: 300px;
  justify-content: space-between;
  margin: 0 5vw;
  @media screen and (min-width: 1200px) {
    margin: 0 auto;
  }
  @media screen and (max-width: 1000px) {
    min-width: 600px;
  }
  @media screen and (max-width: 670px) {
    flex-direction: column;
    min-width: 280px;
    max-width: 350px;
    margin: 0 auto;
    height: 900px;
  }
  @media screen and (max-width: 370px) {
    flex-direction: column;
    min-width: 280px;
    max-width: 350px;
    margin: 0 5vw;
    height: 900px;
  }
`;
