import { configureStore } from "@reduxjs/toolkit";
import cashierSlice from "./cashierSlice";

export const store = configureStore({
  reducer: {
    cashier: cashierSlice,
  },
});
