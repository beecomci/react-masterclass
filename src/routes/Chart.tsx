import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface IChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  // 2주일치(14개)의 데이터를 받아오니 data는 array
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map(price => {
                return {
                  x: price.time_open,
                  y: [
                    price.open.toFixed(2),
                    price.high.toFixed(2),
                    price.low.toFixed(2),
                    price.close.toFixed(2)
                  ]
                };
              })
            }
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light"
            },
            chart: {
              toolbar: {
                show: false
              },
              background: "transparent"
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#d60000",
                  downward: "#0051c7"
                }
              }
            },
            xaxis: {
              type: "datetime"
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
