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

function Header() {
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
        </Menu>
      </HeaderSection>
    </Container>
  );
}

export default Header;
