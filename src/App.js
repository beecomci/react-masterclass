import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${props => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Text = styled.span`
  color: white;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border-radius: 15px;
  border: 0;
`;

const Input = styled.input.attrs({ required: true, minlenght: 10 })`
  background-color: yellow;
`;

function App() {
  return (
    <Father as="header">
      <Box bgColor="teal">
        <Btn>Log in</Btn>
        <Btn as="a" href="#">
          Log in
        </Btn>
      </Box>
      <Circle bgColor="tomato"></Circle>
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
