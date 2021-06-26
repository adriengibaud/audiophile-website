import styled from 'styled-components';
import { ImageTypes } from '@/types/image';
import Image from 'next/image';

const ProductGallery = ({ gallery }: { gallery: ImageTypes[] }) => {
  return (
    <Container>
      <SmallPartContainer>
        {gallery
          .filter((e) => e.fields.title === 'small')
          .map((image) => (
            <SmallImageContainer key={image.sys.id}>
              <Image
                src={`https:${image.fields.file.url}`}
                layout='fill'
                objectFit='cover'
                quality={100}
                className='image'
              />
            </SmallImageContainer>
          ))}
      </SmallPartContainer>
      <BigImageContainer>
        {gallery
          .filter((e) => e.fields.title !== 'small')
          .map((image) => (
            <Image
              key={image.sys.id}
              src={`https:${image.fields.file.url}`}
              layout='fill'
              objectFit='cover'
              quality={100}
              className='image'
            />
          ))}
      </BigImageContainer>
    </Container>
  );
};

export default ProductGallery;

const Container = styled.div`
  width: 100%;
  height: 592px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 100px;
  @media screen and (max-width: 1110px) {
    height: 368px;
  }
  @media screen and (max-width: 689px) {
    flex-direction: column;
    height: 756px;
  }
`;

const SmallPartContainer = styled.div`
  width: 445px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    width: 277px;
  }
  @media screen and (max-width: 689px) {
    flex-direction: column;
    width: 100%;
    height: 368px;
  }
`;

const SmallImageContainer = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 1110px) {
    height: 174px;
  }
  @media screen and (max-width: 689px) {
    height: 174px;
  }
`;

const BigImageContainer = styled.div`
  height: 100%;
  width: 635px;
  position: relative;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 1110px) {
    width: 395px;
  }
  @media screen and (max-width: 689px) {
    width: 100%;
    height: 368px;
  }
`;
