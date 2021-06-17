import { HighlightTypes } from '@/types/highlight';
import Image from 'next/image';
import styled from 'styled-components';

const FullSizeHighlight = ({
  fullSizeData,
}: {
  fullSizeData: HighlightTypes;
}) => {
  console.log(fullSizeData);
  return (
    <Container>
      <ImageContainer>
        <Image
          src={`https:${fullSizeData.fields.image.fields.file.url}`}
          layout='fill'
          objectFit='contain'
        />
      </ImageContainer>
      <InfosContainer>yoyo</InfosContainer>
    </Container>
  );
};

export default FullSizeHighlight;

const Container = styled.section`
  max-width: 1110px;
  width: 1110px;
  height: 560px;
  background: ${({ theme }) => theme.colors.primary};
  margin: 60px auto;
  border-radius: 8px;
  overflow: hidden;
  background-image: url(/pattern-circles.svg);
  background-repeat: no-repeat;
  background-position: -10vw 0vh;
  display: flex;
  flex-direction: row;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(-25%, 0%);
  z-index: 3;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 493px;
  height: 410px;
  overflow: hidden;
  z-index: 4;
  transform: translate(100px, 160px);
`;

const InfosContainer = styled.div`
  width: 150px;
  height: 400px;
  background: red;
`;
