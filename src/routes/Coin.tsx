import { useParams } from "react-router";

interface RouteParams {
  coinId: string;
}

function Coin() {
  // ts에게 url의 pramater가 몇개 있다고 설명 필요
  // But react-router-dom 6점대 이상부터는 useParams를 사용하는 순간 타입이 string or undefined로 지정되어서 불필요
  // const { coinId } = useParams<{coinId:string}>();
  // const { coinId } = useParams<RouteParams>();
  const { coinId } = useParams(); // url에서 get parameter

  return <h1>Coin : {coinId}</h1>;
}

export default Coin;
