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

// step3. App으로 부터 받은 props의 type을 정의하기 위해 interface
interface IRouteProps {
  toggleDark: () => void; // argument를 받지 않고 void를 return하는 함수
  isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouteProps) {
  // step4. Header로 다시 toggleDark를 props로 전달
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header toggleDark={toggleDark} />
      <Container>
        <Routes>
          <Route
            path="/exchange/:coinId/*"
            element={<Exchange isDark={isDark} />}
          ></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
