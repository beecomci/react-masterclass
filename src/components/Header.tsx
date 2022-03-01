import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.header`
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #093687;
  z-index: 100;

  &:after {
    display: block;
    clear: both;
    content: "";
  }
`;

const HeaderSection = styled.section`
  width: 1400px;
  height: 60px;
  margin: 0 auto;
`;

const Title = styled.h1`
  float: left;
  margin-right: 30px;
  font-size: 30px;
  height: 60px;
  font-weight: 500;
  line-height: 60px;
`;

const Menu = styled.ul`
  float: left;
`;

const MenuItem = styled.li`
  float: left;
  height: 60px;
  font-size: 20px;
  line-height: 60px;
`;

// step5. Router로 부터 받은 props의 type을 정의하기 위해 interface
interface IHeaderProps {
  toggleDark: () => void;
}

function Header({ toggleDark }: IHeaderProps) {
  // step6. 드디어 받은 toggleDark를 button에 onClick 함수로 사용 가능
  return (
    <Container>
      <HeaderSection>
        <Title>
          <Link to="/">React Coin</Link>
        </Title>
        <Menu>
          <MenuItem>
            <Link to="/exchange/btc-bitcoin/chart">거래소</Link>
          </MenuItem>
          <MenuItem>
            <button onClick={toggleDark}>Toggle Mode</button>
          </MenuItem>
        </Menu>
      </HeaderSection>
    </Container>
  );
}

export default Header;
