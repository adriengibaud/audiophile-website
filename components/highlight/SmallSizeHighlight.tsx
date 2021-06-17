import { HighlightNoTextTypes } from '@/types/highlight';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Button';
import { useRouter } from 'next/router';

const SmallSizeHighlight = ({
  smallSizeHighlight,
}: {
  smallSizeHighlight: HighlightNoTextTypes;
}) => {
  const router = useRouter();

  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https:${smallSizeHighlight.fields.image.fields.file.url}`}
          layout='fill'
          objectFit='cover'
          quality={100}
          className='image'
        />
      </ImageContainer>
      <InfosContainer>
        <Infos>
          <Title>{smallSizeHighlight.fields.title}</Title>
          <Button
            variant={2}
            text='see product'
            clickHandler={() =>
              router.push(
                '/products/' +
                  smallSizeHighlight.fields.category +
                  '/' +
                  smallSizeHighlight.fields.slug
              )
            }
          />
        </Infos>
      </InfosContainer>
    </Container>
  );
};

export default SmallSizeHighlight;

const Container = styled.section`
  width: 1110px;
  height: 320px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
    height: 424px;
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: calc(50% - 10px);
  height: 100%;
  border-radius: 8px;
  position: relative;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 689px) {
    width: 100%;
    height: 48%;
  }
`;

const InfosContainer = styled.div`
  width: calc(50% - 10px);
  height: 100%;
  background: ${({ theme }) => theme.colors.secondaryLight};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 689px) {
    width: 100%;
    height: 48%;
  }
`;

const Infos = styled.div`
  width: 250px;
  height: 118px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 80px;
  @media screen and (max-width: 1110px) {
    margin-left: 40px;
  }
`;

const Title = styled.h4``;
