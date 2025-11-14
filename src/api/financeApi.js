// src/api/financeApi.js
import apiClient from "./apiClient";

// ✅ 1. Deposit API (POST /wallet/deposit)
export const depositAmount = async ({ crypto, amount }) => {
  try {
    const res = await apiClient.post("/wallet/deposit", { crypto, amount });
    console.log("DEPOSIT SUCCESS:", res.data);
    return res.data;
  } catch (error) {
    const err = error.response?.data || { message: "Deposit failed" };
    console.error("DEPOSIT ERROR:", err);
    throw err;
  }
};

// ✅ 2. Deposit Status Check (GET /wallet/deposit/status/:transactionId)
export const getDepositStatus = async (transactionId) => {
  try {
    const res = await apiClient.get(`/wallet/deposit/status/${transactionId}`);
    console.log("STATUS SUCCESS:", res.data);
    return res.data;
  } catch (error) {
    const err = error.response?.data || { message: "Status check failed" };
    console.error("STATUS ERROR:", err);
    throw err;
  }
};

// CRYPTO WITHDRAW API
export const withdrawCrypto = async ({ crypto, amount, address, otp }) => {
  try {
    const res = await apiClient.post("/wallet/withdraw", {
      crypto,
      amount,
      address,
      otp,
    });
    return res.data;
  } catch (err) {
    const error = err.response?.data || { message: "Withdraw failed" };
    throw error;
  }
};

