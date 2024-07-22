// store/storeConfig.js
import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authenticationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default to localStorage

const store = configureStore({
  reducer: {
    authenticationSlice,
  },
});

export default store;
