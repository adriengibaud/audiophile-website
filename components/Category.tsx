import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { CategoryTypes } from 'types/category';
import Button from './Button';
import { useRouter } from 'next/router';

const Category = ({ category }: { category: CategoryTypes }) => {
  const router = useRouter();

  return (
    <Link href={'/products/' + category.fields.slug.slice(0, -1)}>
      <Container>
        <Body>
          <img
            src={`https:${category.fields.image.fields.file.url}`}
            alt='category image'
          />
          <Title>{category.fields.title}</Title>
          <ButtonContainer>
            <Button
              variant={3}
              text='shop'
              clickHandler={() =>
                router.push('/products/' + category.fields.slug.slice(0, -1))
              }
            />
          </ButtonContainer>
        </Body>
      </Container>
    </Link>
  );
};

export default Category;

const Container = styled.div`
  width: 32%;
  height: 284px;
  @media screen and (max-width: 670px) {
    width: 100%;
  }
`;

const Body = styled.div`
  margin-top: 86px;
  width: 100%;
  height: 204px;
  background: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 170px;
    object-fit: contain;
    transform: translateY(-40px);
    margin-bottom: -40px;
  }
  @media screen and (max-width: 900px) {
    height: 160px;
    img {
      width: 130px;
    }
  }
  @media screen and (max-width: 670px) {
    height: 200px;
    img {
      width: 170px;
    }
  }
`;

const Title = styled.h6`
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;
