import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import { useQuery } from "react-query";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
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

interface RouteParams {
  coinId: string;
}

// state의 type 정의
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

interface ICoinID {}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation() as RouteStates;
  const name = location?.state?.name;
  const priceMatch = useMatch("/:coinId/price"); // 내가 이 url 안에 있냐
  const chartMatch = useMatch("/:coinId/chart");

  // param1 : 고유한 값 coinId를 query key로 사용
  // param2 : Coins에서는 인자가 필요없었으나 여기선 coinId를 알아야 하니까 (호출이 아닌 함수 자체로 넘겨줘야함 !)
  // 그래서 fetchCoinInfo 함수를 호출해서 ciondId를 넣어주는 함수를 생성해서 전달

  // react query는 query를 array로 봄
  // 넘겨주는 key를 배열로 만들어서 같은 coinId를 사용하지 않도록 생성
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  // useQuery의 param3 : optional, refetchInterval로 ms초마다 데이터 갱신 -> UI re-render
  // 주기적으로 백그라운드에서 데이터를 update 가능
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    { refetchInterval: 5000 }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{name ? name : loading ? "Loading..." : infoData?.name}</title>
        </Helmet>
      </HelmetProvider>

      <Header>
        {/* state로부터 온 name이 있으면 -> name or 없으면 -> loading */}
        {/* 근데 loading이 true면 Loading 메세지를 or false면 API로부터 온 name  */}
        <Title>{name ? name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
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

          {/* chartMatch가 null이 아님 -> /:coinId/chart url에 들어와있다면 isActice는 true */}
          <Tabs>
            <Tab isActice={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActice={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="/price" element={<Price />}></Route>
            <Route path="/chart" element={<Chart coinId={coinId!} />}></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
