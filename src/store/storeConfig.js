// src/store/storeConfig.js
import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: "authentication", // Use the same key as the slice name
  storage,
};

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authenticationReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: {
    authentication: persistedReducer, // Use "authentication" to match the slice name
  },
});

export const persistor = persistStore(store);
export default store;
