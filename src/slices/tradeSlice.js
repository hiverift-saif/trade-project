// src/slices/tradeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAsset: "BTCUSDT",
  amount: 10,
  seconds: 30,
  payout: 90,
  balance: 50000,
  livePrice: null,
  opened: [],
  closed: [],
  assets: [],                    // ← REQUIRED
  showTradeMobile: true,
  chartType: "candles",

  // TopBar
  showAccountPanel: false,
  showTopupPanel: false,
  showProfilePanel: false,
  selectedCurrency: "USD",
  paymentMethod: "Tether (USDT) TRC-20",
  topupAmount: "30",
  topupEmail: "",
  hasPromoCode: false,
  promoCode: "",
  isPaymentDropdownOpen: false,
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setSelectedAsset: (state, action) => { state.selectedAsset = action.payload; },
    setAmount: (state, action) => {
      const val = Number(action.payload);
      state.amount = isNaN(val) ? 0 : Math.max(0, val);
    },
    setSeconds: (state, action) => {
      const val = Number(action.payload);
      state.seconds = isNaN(val) ? 30 : Math.max(1, val);
    },
    setPayout: (state, action) => { state.payout = Number(action.payload); },
    setLivePrice: (state, action) => { state.livePrice = Number(action.payload); },
    updateBalance: (state, action) => { state.balance = Number(action.payload); },
    deductBalance: (state, action) => {
      const amt = Number(action.payload);
      if (!isNaN(amt)) state.balance = Math.max(0, state.balance - amt);
    },
    addOpenedTrade: (state, action) => { state.opened.unshift(action.payload); },
    addClosedTrade: (state, action) => { state.closed.unshift(action.payload); },
    updateTradeRemaining: (state) => {
      state.opened = state.opened
        .map(t => ({ ...t, remaining: Math.max(0, t.remaining - 1) }))
        .filter(t => {
          if (t.remaining === 0) {
            state.closed.unshift({ ...t, status: "expired" });
            return false;
          }
          return true;
        });
    },

    // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

    toggleTradeMobile: (state) => { state.showTradeMobile = !state.showTradeMobile; },
    setShowTradeMobile: (state, action) => { state.showTradeMobile = action.payload; },
    setChartType: (state, action) => { state.chartType = action.payload; },

    // TopBar
    toggleAccountPanel: (state) => {
      state.showAccountPanel = !state.showAccountPanel;
      state.showTopupPanel = false;
      state.showProfilePanel = false;
      state.isPaymentDropdownOpen = false;
    },
    toggleTopupPanel: (state) => {
      state.showTopupPanel = !state.showProfilePanel;
      state.showAccountPanel = false;
      state.showProfilePanel = false;
      state.isPaymentDropdownOpen = false;
    },
    toggleProfilePanel: (state) => {
      state.showProfilePanel = !state.showProfilePanel;
      state.showAccountPanel = false;
      state.showTopupPanel = false;
      state.isPaymentDropdownOpen = false;
    },
    togglePaymentDropdown: (state) => {
      state.isPaymentDropdownOpen = !state.isPaymentDropdownOpen;
    },
    setSelectedCurrency: (state, action) => { state.selectedCurrency = action.payload; },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      state.isPaymentDropdownOpen = false;
    },
    setTopupAmount: (state, action) => { state.topupAmount = action.payload; },
    setTopupEmail: (state, action) => { state.topupEmail = action.payload; },
    togglePromoCode: (state) => { state.hasPromoCode = !state.hasPromoCode; },
    setPromoCode: (state, action) => { state.promoCode = action.payload; },
    topupBalance: (state, action) => {
      const amt = Number(action.payload);
      if (!isNaN(amt) && amt > 0) {
        state.balance += amt;
        state.showTopupPanel = false;
        state.topupAmount = "30";
        state.topupEmail = "";
        state.hasPromoCode = false;
        state.promoCode = "";
      }
    },
  },
});

// EXPORT ALL ACTIONS — INCLUDING setAssets
export const {
  setSelectedAsset,
  setAmount,
  setSeconds,
  setPayout,
  setLivePrice,
  updateBalance,
  deductBalance,
  addOpenedTrade,
  addClosedTrade,
  updateTradeRemaining,
  setAssets,                    // ←←←←←←←←←←←←←←←←←←←←←←←←←←
  toggleTradeMobile,
  setShowTradeMobile,
  setChartType,

  // TopBar
  toggleAccountPanel,
  toggleTopupPanel,
  toggleProfilePanel,
  togglePaymentDropdown,
  setSelectedCurrency,
  setPaymentMethod,
  setTopupAmount,
  setTopupEmail,
  togglePromoCode,
  setPromoCode,
  topupBalance,
} = tradeSlice.actions;

export default tradeSlice.reducer;