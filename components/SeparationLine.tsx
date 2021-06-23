import styled from 'styled-components';

const SeparationLine = () => {
  return <Container />;
};

export default SeparationLine;

const Container = styled.div`
  height: 1px;
  width: 1110px;
  position: absolute;
  background: white;
  top: 100px;
  opacity: 20%;
  @media screen and (max-width: 1110px) {
    width: 689px;
  }
  @media screen and (max-width: 689px) {
    width: 327px;
  }
`;
