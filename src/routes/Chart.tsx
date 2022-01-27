import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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
  // 2주일치(14개)의 데이터를 받아오니 data는 array
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map(price => price.close)
            }
          ]}
          options={{
            theme: {
              mode: "dark"
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false
              },
              background: "transparent"
            },
            stroke: {
              curve: "smooth",
              width: 4
            },
            grid: {
              show: false
            },
            yaxis: {
              show: false
            },
            xaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              labels: {
                show: false
              },
              type: "datetime",
              categories: data?.map(price => price.time_close)
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100]
              }
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: value => `$ ${value.toFixed(2)}`
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
