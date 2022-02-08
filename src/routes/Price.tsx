import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Title = styled.span``;

const Content = styled.strong<{ isPlus?: Boolean }>`
  color: ${props =>
    props.isPlus ? props.theme.plusColor : props.theme.minusColor};
  font-weight: 800;

  &.date {
    color: inherit;
  }
`;

interface IPriceProps {
  coinId: string;
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

function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 5000 }
  );

  const isPlusNumber = (num: number) => num > 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Info>
            <Title>Current Prices : </Title>
            <Content isPlus={isPlusNumber(data?.quotes.USD.price!)}>
              ${data?.quotes.USD.price.toFixed(3)}
            </Content>
          </Info>
          <Info>
            <Title>Percent Change 12 Hours : </Title>
            <Content
              isPlus={isPlusNumber(data?.quotes.USD.percent_change_12h!)}
            >
              {data?.quotes.USD.percent_change_12h}%
            </Content>
          </Info>
          <Info>
            <Title>Percent Change 24 Hours : </Title>
            <Content
              isPlus={isPlusNumber(data?.quotes.USD.percent_change_24h!)}
            >
              {data?.quotes.USD.percent_change_24h}%
            </Content>
          </Info>
          <Info>
            <Title>Percent Change 7 days : </Title>
            <Content isPlus={isPlusNumber(data?.quotes.USD.percent_change_7d!)}>
              {data?.quotes.USD.percent_change_7d}%
            </Content>
          </Info>
          <Info>
            <Title>Volume Change 24 hours :</Title>
            <Content
              isPlus={isPlusNumber(data?.quotes.USD.volume_24h_change_24h!)}
            >
              ${data?.quotes.USD.volume_24h_change_24h}
            </Content>
          </Info>
          <Info>
            <Title>Maximum Price : </Title>
            <Content isPlus={isPlusNumber(data?.quotes.USD.ath_price!)}>
              ${data?.quotes.USD.ath_price.toFixed(3)}
            </Content>
          </Info>
          <Info>
            <Title>Maximum Price Date : </Title>
            <Content className={"date"}>
              {data?.quotes.USD.ath_date.slice(0, 10)}
            </Content>
          </Info>
        </>
      )}
    </>
  );
}

export default Price;
