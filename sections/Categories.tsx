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
  width: 1110px;
  height: 300px;
  justify-content: space-between;
  margin: 0 auto;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    flex-direction: column;
    width: 327px;
    margin: 0 auto;
    height: 683px;
  }
`;
