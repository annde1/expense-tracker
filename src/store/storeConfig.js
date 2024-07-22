// store/storeConfig.js
import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice";

const store = configureStore({
  reducer: {
    authenticationSlice,
  },
});

export default store;
