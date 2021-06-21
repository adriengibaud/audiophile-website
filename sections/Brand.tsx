import { BrandType } from '@/types/brand';
import styled from 'styled-components';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Brand = ({ brandData }: { brandData: BrandType }) => {
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');
  const [highlight, setHighlight] = useState('');

  const test = () => {
    const textArray = brandData.fields.catchingPhrase.split(' ');
    let index = 0;
    textArray.map((e, i) => {
      if (e[0] === '_' && e[1] === '_') index = i;
    });
    setFirstPart(textArray.slice(0, index).join(' '));
    setSecondPart(textArray.slice(index + 1, textArray.length).join(' '));
    setHighlight(
      textArray[index]
        .split('')
        .filter((e) => e !== '_')
        .join('')
    );
  };

  useEffect(() => {
    test();
  }, [brandData.fields.catchingPhrase]);

  return (
    <Container>
      <InfosContainer>
        <Title>
          {firstPart} <span className='highlight'>{highlight}</span>{' '}
          {secondPart}
        </Title>
        <Description>{brandData.fields.description}</Description>
      </InfosContainer>
      <DesktopImageContainer>
        <Image
          src={`https:${brandData.fields.desktopImage.fields.file.url}`}
          layout='fill'
          objectFit='cover'
          className='image'
        />
      </DesktopImageContainer>
      <MobileImageContainer>
        <Image
          src={`https:${brandData.fields.mobileImage.fields.file.url}`}
          layout='fill'
          objectFit='cover'
          className='image'
        />
      </MobileImageContainer>
      <TabletImageContainer>
        <Image
          src={`https:${brandData.fields.tabletImage.fields.file.url}`}
          layout='fill'
          objectFit='cover'
          className='image'
        />
      </TabletImageContainer>
    </Container>
  );
};

export default Brand;

const Container = styled.section`
  height: 588px;
  width: 1110px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1110px) {
    width: 689px;
    height: 633px;
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
    height: 698px;
    margin: 0px auto 50px auto;
  }
`;

const InfosContainer = styled.div`
  width: 445px;
  height: 295px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    height: 270px;
    width: 573px;
    text-align: center;
  }
  @media screen and (max-width: 689px) {
    height: 360px;
    width: 100%;
  }
`;

const Title = styled.h2`
  .highlight {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media screen and (max-width: 689px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font: 15px Manrope;
  line-height: 25px;
`;

const DesktopImageContainer = styled.div`
  width: calc(50% - 10px);
  height: 100%;
  position: relative;
  border-radius: 8px;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 1110px) {
    display: none;
  }
`;
const TabletImageContainer = styled.div`
  display: none;
  width: 100%;
  height: 300px;
  position: relative;
  border-radius: 8px;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 1110px) {
    display: inline;
  }
  @media screen and (max-width: 689px) {
    display: none;
  }
`;
const MobileImageContainer = styled.div`
  display: none;
  width: 100%;
  height: 300px;
  position: relative;
  border-radius: 8px;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 689px) {
    display: inline;
  }
`;
