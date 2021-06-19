import { FooterTypes } from '@/types/footer';
import styled from 'styled-components';

const Footer = ({ footerData }: { footerData: FooterTypes }) => {
  return <Container>yoyo</Container>;
};

export default Footer;

const Container = styled.footer`
  width: 100%;
  height: 365px;
  background: ${({ theme }) => theme.colors.secondary};
`;
