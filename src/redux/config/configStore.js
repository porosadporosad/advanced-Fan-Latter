import { createStore } from "redux";
import { combineReducers } from "redux";
import stateRedux from "../modules/stateRedux";
import colorChange from "../modules/colorChange";
import authSlice from "../modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   stateRedux,
//   colorChange,
// });
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    stateRedux,
    colorChange,
    authSlice,
  },
});

export default store;
