import stateRedux from "../modules/stateRedux";
import colorChange from "../modules/colorChange";
import authSlice from "../modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    stateRedux,
    colorChange,
    authSlice,
  },
});

export default store;
