import { CategoryTypes } from '@/types/category';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const NavButtons = ({
  categoriesData,
}: {
  categoriesData: CategoryTypes[];
}) => {
  const router = useRouter();

  const handleClick = (slug = '') => {
    if (slug) router.push('/products/' + slug.slice(0, -1));
    else router.push('/');
  };

  return (
    <Container>
      <Entry onClick={() => handleClick()}>Home</Entry>
      {categoriesData.map((e) => {
        return (
          <Entry key={e.fields.slug} onClick={() => handleClick(e.fields.slug)}>
            {e.fields.title}
          </Entry>
        );
      })}
    </Container>
  );
};

export default NavButtons;

const Container = styled.div`
  height: 25px;
  width: 429px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 689px) {
    width: 108px;
    min-height: 148px;
    max-height: 148px;
    flex-direction: column;
  }
`;

const Entry = styled.button`
  height: 100%;
  width: auto;
  color: ${({ theme }) => theme.colors.white};
  font: 13px Manrope;
  font-weight: bold;
  line-height: 25px;
  letter-spacing: 2px;
  text-transform: uppercase;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media screen and (max-width: 689px) {
    height: 25px;
    text-align: center;
  }
`;
