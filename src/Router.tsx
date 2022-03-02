import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./routes/Home";
import Exchange from "./routes/Exchange";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

const Container = styled.div`
  width: 1400px;
  height: 100%;
  margin: 0 auto;

  &:after {
    display: block;
    clear: both;
    content: "";
  }
`;

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Container>
        <Routes>
          <Route path="/exchange/:coinId/*" element={<Exchange />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
