import apiClient from "./apiClient";

// BUY Trade
export const buyTrade = (data) => {
  return apiClient.post("/trades/buy", data);
};

// SELL Trade (same endpoint, just type = sell)
export const sellTrade = (data) => {
  return apiClient.post("/trades/buy", data);
};

// Get All Trades
export const getTrades = () => {
  return apiClient.get("/trades");
};

// Get Open Trades
export const getOpenTrades = () => {
  return apiClient.get("/trades/open");
};

// Get Closed Trades
export const getClosedTrades = () => {
  return apiClient.get("/trades/closed");
};

// Trade By ID
export const getTradeById = (id) => {
  return apiClient.get(`/trades/${id}`);
};
