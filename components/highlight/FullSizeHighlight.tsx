import { HighlightTypes } from '@/types/highlight';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Button from '../Button';

const FullSizeHighlight = ({
  fullSizeData,
}: {
  fullSizeData: HighlightTypes;
}) => {
  const router = useRouter();
  console.log(fullSizeData);
  const linkData = fullSizeData.fields.link.content.find(
    (e) => e.nodeType === 'embedded-entry-block'
  );

  console.log(linkData);

  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https:${fullSizeData.fields.image.fields.file.url}`}
          layout='fill'
          objectFit='contain'
        />
      </ImageContainer>
      <InfosContainer>
        <Title>{fullSizeData.fields.title}</Title>
        <Overline>{fullSizeData.fields.subtitle}</Overline>
        <Button
          variant={2}
          text='see product'
          clickHandler={() =>
            router.push(
              '/products/' +
                fullSizeData.fields.category +
                '/' +
                fullSizeData.fields.slug
            )
          }
        />
      </InfosContainer>
    </Container>
  );
};

export default FullSizeHighlight;

const Container = styled.section`
  max-width: 1110px;
  width: 1110px;
  height: 560px;
  background: ${({ theme }) => theme.colors.primary};
  margin: 60px auto 0 auto;
  border-radius: 8px;
  overflow: hidden;
  background-image: url(/pattern-circles.svg);
  background-repeat: no-repeat;
  background-position: -130px 0;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1110px) {
    width: 689px;
    height: 720px;
    background-position: -125px -290px;
    flex-direction: column;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
    height: 600px;
    background-position: -112px -120px;
    background-size: 550px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 493px;
  height: 410px;
  overflow: hidden;
  z-index: 4;
  transform: translate(100px, 160px);
  @media screen and (max-width: 1110px) {
    transform: translate(0, 0);
    margin: 50px auto;
    width: 191.21px;
    height: 237px;
  }
  @media screen and (max-width: 689px) {
    width: 172.25px;
    height: 207px;
    margin-top: 60px;
  }
`;

const InfosContainer = styled.div`
  width: 349px;
  height: 303px;
  margin: auto 0 auto 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    text-align: center;
    align-items: center;
    margin: 10px auto 50px auto;
  }
  @media screen and (max-width: 689px) {
    width: 280px;
    height: 330px;
    margin: 0px auto 50px auto;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
`;

const Overline = styled.span`
  font: 14px Manrope, regular;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 0px;
  line-height: 25px;
  opacity: 70%;
`;
