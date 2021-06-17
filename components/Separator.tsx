import styled from 'styled-components';

const Separator = () => {
  return <Container />;
};

export default Separator;

const Container = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(251, 251, 251, 0) 0%,
    rgba(255, 255, 255, 0.7970128676470588) 30%,
    rgba(255, 255, 255, 0.799954044117647) 70%,
    rgba(252, 254, 255, 0) 100%
  );
  width: 100%;
`;
