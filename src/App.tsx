import styled from "styled-components";

function App() {
  const H1 = styled.h1`
    color: ${props => props.theme.textColor};
  `;

  const Container = styled.div`
    background-color: ${props => props.theme.bgColor};
  `;

  return (
    <div>
      <Container>
        <H1>Hello</H1>
      </Container>
    </div>
  );
}

export default App;
