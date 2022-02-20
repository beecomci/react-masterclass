const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  // fetch 후 response의 json return
  return fetch(`${BASE_URL}/coins`).then(response => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export function fetchAllCoinTickers() {
  return fetch(`${BASE_URL}/tickers`).then(response => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000); // milliesconds to seconds
  const startDate = endDate - 60 * 60 * 24 * 30 * 2; // 2달 전

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then(response => response.json());
}
