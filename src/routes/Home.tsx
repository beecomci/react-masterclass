import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import Loading from "../components/Loading";

const CoinsList = styled.ul`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  padding-bottom: 40px;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.listBgColor};
  color: #000;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Home() {
  // param1 : query id (고유하게 식별해주는 key)
  // param2 : function
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>

      {isLoading ? (
        <Loading />
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link
                to={`/exchange/${coin.id}/chart`}
                state={{ name: coin.name }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </>
  );
}

export default Home;
