import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedIn: false, userData: undefined };

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log("HELLO LOGIN");
      console.log(action.payload);
      state.loggedIn = true;
      state.userData = action.payload;
      console.log(state);
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});
export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
