import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedIn: false, userData: undefined };

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.userData = undefined;
    },
  },
});

export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
