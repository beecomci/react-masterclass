export function fetchCoins() {
  // fetch 후 response의 json return
  return fetch("https://api.coinpaprika.com/v1/coins").then(response =>
    response.json()
  );
}
