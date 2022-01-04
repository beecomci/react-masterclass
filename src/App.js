import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Text = styled.span`
  font-size: 30px;
`;

const Box = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  background-color: tomato;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;

  ${Text} {
    &:hover {
      color: yellow;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Text as="p">happy</Text>
      </Box>
    </Wrapper>
  );
}

export default App;
