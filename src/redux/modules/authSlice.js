import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginNow: {
    accessToken: "",
    userId: "",
    success: false,
    avatar: "",
    nickname: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loginNow = action.payload;
    },
    loginout: (state) => {
      state.loginNow = null;
    },
  },
});

export default authSlice.reducer;
export const { login, loginout } = authSlice.actions;
