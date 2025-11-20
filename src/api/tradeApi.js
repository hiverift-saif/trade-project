import apiClient from "./apiClient";

// BUY Trade
export const buyTrade = (data) => {
  return apiClient.post("/trades/buy", data);
};

// SELL Trade
export const sellTrade = (data) => {
  return apiClient.post("/trades/sell", data);
};

// Get All Trades
export const getTrades = () => apiClient.get("/trades");

// ⭐ Correct – Get Open Trades
export const getOpenTrades = () =>
  apiClient.get("/trades/filter?status=open");

// Get Closed Trades
export const getClosedTrades = () =>
  apiClient.get("/trades/filter?status=closed");

// Get Trade By ID
export const getTradeById = (id) => apiClient.get(`/trades/${id}`);
