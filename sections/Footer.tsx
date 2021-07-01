import NavButtons from '@/components/NavButtons';
import { CategoryTypes } from '@/types/category';
import { FooterTypes } from '@/types/footer';
import Image from 'next/image';
import styled from 'styled-components';
import { FaFacebookSquare, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = ({
  footerData,
  categoriesData,
}: {
  footerData: FooterTypes;
  categoriesData: CategoryTypes[];
}) => {
  const openSocialNetwork = (url) => {
    return window.open(url, '_blank');
  };

  return (
    <Container>
      <Body>
        <Rectangle />
        <HeadContainer>
          <Logo>
            <Image
              src='/logo.svg'
              layout='fill'
              objectFit='cover'
              className='image'
              alt="Company's logo"
            />
          </Logo>
          <NavButtons categoriesData={categoriesData} />
        </HeadContainer>
        <InfosContainer>
          <BrandDescription>{footerData.fields.brandInfos}</BrandDescription>
          <LinkContainer>
            {footerData.fields.facebookLink && (
              <LinkIcon
                onClick={() =>
                  openSocialNetwork(footerData.fields.facebookLink)
                }
              >
                <FaFacebookSquare className='image' />
              </LinkIcon>
            )}
            {footerData.fields.twitterLink && (
              <LinkIcon
                onClick={() => openSocialNetwork(footerData.fields.twitterLink)}
              >
                <FaTwitter className='image' />
              </LinkIcon>
            )}
            {footerData.fields.instagramLink && (
              <LinkIcon
                onClick={() =>
                  openSocialNetwork(footerData.fields.instagramLink)
                }
              >
                <FaInstagram className='image' />
              </LinkIcon>
            )}
          </LinkContainer>
        </InfosContainer>
        <Copyright>Copyright 2021 All right Reserved</Copyright>
      </Body>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 365px;
  background: ${({ theme }) => theme.colors.secondary};
  display: inline-block;
  @media screen and (max-width: 1110px) {
    height: 400px;
  }
  @media screen and (max-width: 689px) {
    height: 654px;
    display: flex;
  }
`;

const Body = styled.div`
  width: 1110px;
  height: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
    height: 77%;
  }
`;

const Rectangle = styled.div`
  width: 104px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary};
  position: absolute;
  @media screen and (max-width: 689px) {
    position: relative;
    margin: 0 auto;
  }
`;

const HeadContainer = styled.div`
  width: 100%;
  height: 25px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    flex-direction: column;
    height: 22%;
  }
  @media screen and (max-width: 689px) {
    height: 42%;
    align-items: center;
    margin-top: 0;
  }
`;

const Logo = styled.div`
  width: 143px;
  height: 25px;
  position: relative;
`;

const InfosContainer = styled.div`
  height: 95px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width: 689px) {
    height: auto;
  }
`;
const BrandDescription = styled.p`
  width: 540px;
  height: 100%;
  line-height: 25px;
  font: 15px Manrope;
  color: ${({ theme }) => theme.colors.white};
  opacity: 60%;
  @media screen and (max-width: 1110px) {
    width: 100%;
  }
  @media screen and (max-width: 689px) {
    height: auto;
    text-align: center;
  }
`;

const LinkContainer = styled.div`
  height: 24px;
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    position: absolute;
    transform: translate(587px, 70px);
  }
  @media screen and (max-width: 689px) {
    transform: translate(111.5px, 120px);
  }
`;

const LinkIcon = styled.button`
  width: 24px;
  position: relative;
  line-height: 24px;
  .image {
    fill: ${({ theme }) => theme.colors.white};
    font-size: 24px;
    :hover {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Copyright = styled.p`
  font: 15px Manrope;
  width: 540px;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  opacity: 60%;
  @media screen and (max-width: 689px) {
    width: 100%;
    text-align: center;
  }
`;
