const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  // fetch 후 response의 json return
  return fetch(`${BASE_URL}/coins`).then(response => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>
    response.json()
  );
}
