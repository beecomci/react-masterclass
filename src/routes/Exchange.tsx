import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Price from "./Price";
import Chart from "./Chart";
import { fetchAllCoinTickers, fetchCoinInfo, fetchCoinTickers } from "../api";
import Loading from "../components/Loading";

const CoinDetailSection = styled.section`
  float: left;
  width: 900px;
`;

const CoinsListSection = styled.section`
  float: right;
  width: 400px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  ${Img} {
    margin-bottom: 2px;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 400;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActice: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props =>
    props.isActice ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const CoinsList = styled.ul`
  overflow-y: scroll;
  height: 1000px;
`;

const Coin = styled.li`
  a {
    width: 100%;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 15px;
    box-shadow: rgb(0 0 0 / 5%) 0px 1px 2px 0px;
    transition: all 0.2s ease-in-out 0s;
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: ${props => props.theme.textColor};
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const ListTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 400;
  color: ${props => props.theme.accentColor};
`;

const CoinNameArea = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
`;

const CoinPriceArea = styled.div<{ isPlus: Boolean }>`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  color: ${props =>
    props.isPlus ? props.theme.plusColor : props.theme.minusColor};

  & span {
    width: 50%;
    font-size: 16px;
    font-weight: 400;
  }
  & span:first-child {
    margin-right: 50px;
  }
  & span:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

interface RouteParams {
  coinId: string;
}

// state??? type ??????
interface RouteStates {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Exchange() {
  const { coinId } = useParams();
  const location = useLocation() as RouteStates;
  const name = location?.state?.name;
  const priceMatch = useMatch("/exchange/:coinId/price"); // ?????? ??? url ?????? ??????
  const chartMatch = useMatch("/exchange/:coinId/chart");

  // param1 : ????????? ??? coinId??? query key??? ??????
  // param2 : Coins????????? ????????? ?????????????????? ????????? coinId??? ????????? ????????? (????????? ?????? ?????? ????????? ??????????????? !)
  // ????????? fetchCoinInfo ????????? ???????????? ciondId??? ???????????? ????????? ???????????? ??????

  // react query??? query??? array??? ???
  // ???????????? key??? ????????? ???????????? ?????? coinId??? ???????????? ????????? ??????
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  // useQuery??? param3 : optional, refetchInterval??? ms????????? ????????? ?????? -> UI re-render
  // ??????????????? ????????????????????? ???????????? update ??????
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000
    }
  );

  const { isLoading: allTickersLoading, data: allTickersData } = useQuery<
    IPriceData[]
  >("allTickers", fetchAllCoinTickers, {
    refetchInterval: 5000
  });

  const loading = infoLoading || tickersLoading;

  const isPlusNumber = (num: number) => num > 0;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{name ? name : loading ? "Loading..." : infoData?.name}</title>
        </Helmet>
      </HelmetProvider>

      <CoinDetailSection>
        <Header>
          <Img
            src={`https://cryptoicon-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
            alt={infoData?.id}
          />
          {/* state????????? ??? name??? ????????? -> name or ????????? -> loading */}
          {/* ?????? loading??? true??? Loading ???????????? or false??? API????????? ??? name  */}
          <Title>{name ? name : loading ? "Loading..." : infoData?.name}</Title>
        </Header>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            {/* chartMatch??? null??? ?????? -> /:coinId/chart url??? ?????????????????? isActice??? true */}
            <Tabs>
              <Tab isActice={chartMatch !== null}>
                <Link to={`/exchange/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActice={priceMatch !== null}>
                <Link to={`/exchange/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Routes>
              <Route path="/price" element={<Price coinId={coinId!} />}></Route>
              <Route path="/chart" element={<Chart coinId={coinId!} />}></Route>
            </Routes>
          </>
        )}
      </CoinDetailSection>

      <CoinsListSection>
        <ListTitle>Coin List</ListTitle>
        {allTickersLoading ? (
          <Loading />
        ) : (
          <CoinsList>
            {allTickersData?.slice(0, 100).map(coin => (
              <Coin key={coin.id}>
                <Link
                  to={`/exchange/${coin.id}/chart`}
                  state={{ name: coin.name }}
                >
                  <CoinNameArea>
                    <Img
                      src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      alt={coin.id}
                    />
                    {coin.name}
                  </CoinNameArea>
                  <CoinPriceArea
                    isPlus={isPlusNumber(coin.quotes.USD.percent_change_15m)}
                  >
                    <span>${coin.quotes.USD.price.toFixed(2)}</span>
                    <span>{coin.quotes.USD.percent_change_15m}%</span>
                  </CoinPriceArea>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </CoinsListSection>
    </>
  );
}

export default Exchange;
