import { HeaderTypes } from '@/types/header';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import SeparationLine from '@/components/SeparationLine';

const Header = ({ data }: { data: HeaderTypes }) => {
  const router = useRouter();

  return (
    <>
      <Container>
        <HeaderBody>
          <SeparationLine />
          <InfosContainer>
            <Overline>New product</Overline>
            <Title>{data.fields.title}</Title>
            <Description>{data.fields.subtitle}</Description>
            <ButtonContainer>
              <Button
                variant={1}
                text='see product'
                clickHandler={() =>
                  router.push(
                    '/products/' + data.fields.category + '/' + data.fields.slug
                  )
                }
              />
            </ButtonContainer>
          </InfosContainer>
          <ImageContainer>
            <Image
              src={`https:${data.fields.image.fields.file.url}`}
              layout='fill'
              objectFit='contain'
              quality={75}
            />
          </ImageContainer>
        </HeaderBody>
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 630px;
  background: ${({ theme }) => theme.colors.secondary};
`;

const HeaderBody = styled.section`
  width: 100%;
  max-width: 1110px;
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 80%;
  z-index: 3;
  margin: auto 0 auto 5%;
  @media screen and (max-width: 1110px) {
    width: 100%;
    height: 85%;
    margin: auto;
    filter: brightness(30%);
  }
`;

const InfosContainer = styled.div`
  color: white;
  width: 50%;
  height: 346px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    position: absolute;
    z-index: 5;
    align-items: center;
    text-align: center;
    margin: auto;
    width: 400px;
  }

  @media screen and (max-width: 430px) {
    width: 95%;
  }
`;

const Overline = styled.span`
  font: 14px Manrope, regular;
  text-transform: uppercase;
  letter-spacing: 10px;
  line-height: 19px;
  opacity: 40%;
`;

const Title = styled.h1`
  @media screen and (max-width: 500px) {
    font-size: 45px;
  }
`;

const Description = styled.span`
  font: 15px Manrope;
  line-height: 25px;
  opacity: 60%;
`;

const ButtonContainer = styled.div``;
