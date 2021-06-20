import NavButtons from '@/components/NavButtons';
import { CategoryTypes } from '@/types/category';
import { FooterTypes } from '@/types/footer';
import Image from 'next/image';
import styled from 'styled-components';
import { FaFacebookSquare } from 'react-icons/fa';

const Footer = ({
  footerData,
  categoriesData,
}: {
  footerData: FooterTypes;
  categoriesData: CategoryTypes[];
}) => {
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
            />
          </Logo>
          <NavButtons categoriesData={categoriesData} />
        </HeadContainer>
        <InfosContainer>
          <BrandDescription>{footerData.fields.brandInfos}</BrandDescription>
          <LinkContainer>
            {footerData.fields.facebookLink && (
              <Link>
                <FaFacebookSquare className='image' />
              </Link>
            )}
          </LinkContainer>
        </InfosContainer>
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
`;

const Body = styled.div`
  width: 1110px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Rectangle = styled.div`
  width: 104px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary};
  position: absolute;
`;

const HeadContainer = styled.div`
  width: 100%;
  height: 25px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Logo = styled.div`
  width: 143px;
  height: 100%;
  position: relative;
`;

const InfosContainer = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const BrandDescription = styled.p`
  width: 540px;
  height: 75px;
  color: ${({ theme }) => theme.colors.white};
`;

const LinkContainer = styled.div`
  height: 24px;
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Link = styled.button`
  width: 20px;
  position: relative;
  line-height: 20px;
  .image {
    fill: red;
    font-size: 24px;
    :hover {
      fill: blue;
    }
  }
`;
