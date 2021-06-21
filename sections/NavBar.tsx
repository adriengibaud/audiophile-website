import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CategoryTypes } from '@/types/category';
import NavButtons from '@/components/NavButtons';

const NavBar = ({ categoriesData }: { categoriesData: CategoryTypes[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const changeMenuState = () => setIsOpen(!isOpen);
  const router = useRouter();

  const handleClick = (slug = '') => {
    if (slug) router.push('/products/' + slug.slice(0, -1));
    else router.push('/');
    setIsOpen(false);
  };

  const MenuBody = () => {
    return (
      <>
        {categoriesData &&
          categoriesData.map((e) => (
            <MenuEntry
              key={e.fields.slug}
              onClick={() => handleClick(e.fields.slug)}
            >
              <TextEntry>{e.fields.title}</TextEntry>
              <EntryImageContainer>
                <Image
                  src={`https:${e.fields.image.fields.file.url}`}
                  layout='fill'
                  objectFit='contain'
                  quality={100}
                />
              </EntryImageContainer>
            </MenuEntry>
          ))}
      </>
    );
  };

  return (
    <>
      <Container>
        <HeaderBody>
          <HamburgerButton isOpen={isOpen} onClick={() => changeMenuState()}>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </HamburgerButton>
          <ImageContainer>
            <Image src='/logo.svg' layout='fill' />
          </ImageContainer>
          <Menu>
            <NavButtons categoriesData={categoriesData} />
          </Menu>
          <CartContainer />
        </HeaderBody>
      </Container>
      <MenuBackground onClick={() => setIsOpen(false)} isOpen={isOpen} />
      <MenuContainer isOpen={isOpen}>
        <EntryContainer>{MenuBody()}</EntryContainer>
      </MenuContainer>
    </>
  );
};

export default NavBar;

const Container = styled.nav`
  height: 100px;
  width: 100vw;
  background: ${({ theme }) => theme.colors.secondary};
  z-index: 100;
`;

const HeaderBody = styled.div`
  width: auto;
  height: 100%;
  z-index: 100;
  max-width: 1110px;
  margin: 0 5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
  @media screen and (min-width: 1200px) {
    margin: 0 auto;
  }
`;

const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: none;
  @media screen and (max-width: 1000px) {
    display: inline;
  }
  .bar1,
  .bar2,
  .bar3 {
    width: 2rem;
    height: 0.25rem;
    margin: 6px 20px;
    transition: 0.4s;
    border-radius: 10px;
    transform-origin: 1.5px;
    background-color: ${({ theme }) => theme.colors.white};
  }
  .bar1 {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'none')};
  }

  .bar2 {
    opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
  }

  .bar3 {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'none')};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 143px;
  height: 25px;
  @media screen and (max-width: 1000px) {
    margin-right: auto;
  }
`;

const Menu = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const CartContainer = styled.div`
  width: 40px;
  height: 40px;
  background: red;
`;

const MenuBackground = styled.div<{ isOpen: Boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
  position: absolute;
  top: 100px;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: calc(100vh - 100px);
  background: rgba(0, 0, 0, 0.5);
  transition: display 3s linear;
`;

const MenuContainer = styled.div<{ isOpen: boolean }>`
  height: 200px;
  position: absolute;
  background: white;
  width: 100vw;
  z-index: 20;
  top: 99px;
  color: black;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.4s;
  @media screen and (max-width: 470px) {
    height: 340px;
  }
`;

const EntryContainer = styled.div`
  width: 80%;
  height: 450px;
  display: flex;
  flex-direction: row;
  margin: 50px auto 0 auto;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  @media screen and (max-width: 470px) {
    justify-content: center;
    gap: 25px;
  }
`;

const MenuEntry = styled.button`
  height: 100px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
`;

const TextEntry = styled.h6``;

const EntryImageContainer = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  @media screen and (min-width: 1000px) {
    display: none;
  }
`;
