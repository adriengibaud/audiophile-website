import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { CategoryTypes } from '@/types/category';
import NavButtons from '@/components/NavButtons';

import Cart from './Cart';
import { selectCart } from 'app/reducers/cartReducer';

const NavBar = ({ categoriesData }: { categoriesData: CategoryTypes[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const changeMenuState = () => setIsOpen(!isOpen);
  const router = useRouter();
  const cart = useSelector(selectCart);

  const handleClick = (slug = '') => {
    if (slug) router.push('/products/' + slug.slice(0, -1));
    else router.push('/');
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
      if (cartOpen) {
        setCartOpen(false);
      }
    } else if (!isOpen && !cartOpen) {
      document.body.style.overflowY = 'scroll';
    }
  }, [isOpen]);
  useEffect(() => {
    if (cartOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
      if (isOpen) {
        setIsOpen(false);
      }
    } else if (!isOpen && !cartOpen) {
      document.body.style.overflowY = 'scroll';
    }
  }, [cartOpen]);

  const MenuBody = () => {
    return (
      <>
        <MenuEntry onClick={() => handleClick()}>
          <TextEntry>Home</TextEntry>
        </MenuEntry>
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
                  quality={50}
                  alt='category image'
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
            <Link href='/'>
              <Image src='/logo.svg' layout='fill' alt="Company's logo" />
            </Link>
          </ImageContainer>
          <Menu>
            <NavButtons categoriesData={categoriesData} />
          </Menu>
          <CartContainer
            onClick={() => setCartOpen(!cartOpen)}
            src='/icon-cart.svg'
            alt=''
          />
          {cart.length > 0 && (
            <QuantityInCart onClick={() => setCartOpen(!cartOpen)}>
              {cart.length}
            </QuantityInCart>
          )}
        </HeaderBody>
      </Container>
      <MenuBackground onClick={() => setIsOpen(false)} isOpen={isOpen} />
      <MenuContainer isOpen={isOpen}>
        <EntryContainer>{MenuBody()}</EntryContainer>
      </MenuContainer>
      <Cart cartOpen={cartOpen} clickHandler={() => setCartOpen(false)} />
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
  width: 1110px;
  height: 100%;
  z-index: 100;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
  }
`;

const HamburgerButton = styled.button<{ isOpen: boolean }>`
  display: none;
  @media screen and (max-width: 1110px) {
    display: inline;
  }
  .bar1,
  .bar2,
  .bar3 {
    width: 2rem;
    height: 0.25rem;
    margin: 6px 20px 6px 0px;
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
  cursor: pointer;
  height: 25px;
  @media screen and (max-width: 1110px) {
    margin-right: auto;
  }
`;

const Menu = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  margin: 0 auto;
  @media screen and (max-width: 1110px) {
    display: none;
  }
`;

const CartContainer = styled.img`
  width: 40px;
  height: 30px;
  padding-right: 10px;
  max-width: 40px;
  cursor: pointer;
`;

const QuantityInCart = styled.span`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  color: white;
  cursor: pointer;
  vertical-align: top;
  margin-left: -20px;
  transform: translateY(9px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1110px) {
  }
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
  height: calc(100vh - 100px);
  position: absolute;
  background: white;
  width: 300px;
  z-index: 20;
  top: 100px;
  color: black;
  display: flex;
  flex-direction: column;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.4s;
`;

const EntryContainer = styled.div`
  width: 80%;
  height: 450px;
  display: flex;
  flex-direction: column;
  margin: 0px auto 0 25px;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const MenuEntry = styled.button`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TextEntry = styled.h6``;

const EntryImageContainer = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  @media screen and (min-width: 1110px) {
    display: none;
  }
`;
