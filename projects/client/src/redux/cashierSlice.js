import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const cashierSlice = createSlice({
  name: "cashier",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = cashierSlice.actions;
export default cashierSlice.reducer;
