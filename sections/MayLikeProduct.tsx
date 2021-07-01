import { LinkTypes } from '@/types/link';
import styled from 'styled-components';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

const MayLikeProduct = ({ link }: { link: LinkTypes }) => {
  const router = useRouter();

  const redirectToItem = (category, slug) => {
    console.log(category);
    router.push('/products/' + category + '/' + slug);
  };

  return (
    <Container>
      <SectionTitle>you may also like</SectionTitle>
      <MayLikeContent>
        {link.content
          .filter((link) => link.nodeType === 'embedded-entry-block')
          .map((link) => (
            <Entry key={link.data.target.fields.slug}>
              <EntryImage>
                <Image
                  src={`https:${link.data.target.fields.productImage.fields.file.url}`}
                  layout='fill'
                  objectFit='cover'
                  quality={75}
                  className='image'
                  alt='product image'
                />
              </EntryImage>
              <EntryTitle>{link.data.target.fields.title}</EntryTitle>
              <Button
                variant={1}
                text='see product'
                clickHandler={() =>
                  redirectToItem(
                    link.data.target.sys.contentType.sys.id,
                    link.data.target.fields.slug
                  )
                }
              />
            </Entry>
          ))}
      </MayLikeContent>
    </Container>
  );
};

export default MayLikeProduct;

const Container = styled.section`
  margin-top: 100px;
  width: 100%;
  height: 571px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1110px) {
    height: 563px;
  }
  @media screen and (max-width: 689px) {
    height: 1280px;
  }
`;

const SectionTitle = styled.h3``;

const MayLikeContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 471px;
  @media screen and (max-width: 689px) {
    flex-direction: column;
    height: 1200px;
  }
`;

const Entry = styled.div`
  height: 471px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1110px) {
    width: 223px;
  }
  @media screen and (max-width: 689px) {
    height: 350px;
    width: 100%;
  }
`;

const EntryImage = styled.div`
  width: 100%;
  height: 318px;
  position: relative;
  .image {
    border-radius: 8px;
  }
  @media screen and (max-width: 689px) {
    width: 200px;
    height: 230px;
  }
`;

const EntryTitle = styled.h5`
  text-align: center;
  width: 90%;
  @media screen and (max-width: 689px) {
    font-size: 22px;
  }
`;
