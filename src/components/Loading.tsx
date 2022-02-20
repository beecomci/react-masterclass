import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const loadAnimation = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  border-radius: 50%;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${loadAnimation} 1.1s infinite linear;
  animation: ${loadAnimation} 1.1s infinite linear;

  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;

function Loading() {
  return (
    <Container>
      <Loader>Loading...</Loader>
    </Container>
  );
}

export default Loading;
