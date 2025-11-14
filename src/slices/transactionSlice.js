import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  today: [],
  credited: 0,
  debited: 0,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setToday(state, action) {
      state.today = action.payload;
    },
    setCredited(state, action) {
      state.credited = action.payload;
    },
    setDebited(state, action) {
      state.debited = action.payload;
    },
  },
});

export const { setToday, setCredited, setDebited } = transactionSlice.actions;
export default transactionSlice.reducer;
