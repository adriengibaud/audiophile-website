import { HighlightNoTextTypes } from '@/types/highlight';
import styled from 'styled-components';
import Button from '../Button';
import { useRouter } from 'next/router';

const MediumSizeHighlight = ({
  mediumSizeHighlight,
}: {
  mediumSizeHighlight: HighlightNoTextTypes;
}) => {
  const router = useRouter();

  return (
    <Container
      imgUrl={`https:${mediumSizeHighlight.fields.image.fields.file.url}`}
    >
      <InfosContainer>
        <Title>{mediumSizeHighlight.fields.title}</Title>
        <Button
          variant={2}
          text='see product'
          clickHandler={() =>
            router.push(
              '/products/' +
                mediumSizeHighlight.fields.category +
                '/' +
                mediumSizeHighlight.fields.slug
            )
          }
        />
      </InfosContainer>
    </Container>
  );
};

export default MediumSizeHighlight;

const Container = styled.section<{ imgUrl: string }>`
  width: 1110px;
  height: 320px;
  border-radius: 8px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: no-repeat right top url(${({ imgUrl }) => imgUrl}),
    radial-gradient(
      circle,
      rgba(241, 241, 241, 1) 0%,
      rgba(120, 119, 119, 1) 100%
    );
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
    background-position: -170px 0px;
  }
`;

const InfosContainer = styled.div`
  width: 204px;
  height: 118px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 689px) {
    margin-left: 20px;
  }
`;

const Title = styled.h4``;
