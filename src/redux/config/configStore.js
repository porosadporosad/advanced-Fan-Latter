import { createStore } from "redux";
import { combineReducers } from "redux";
import stateRedux from "../modules/stateRedux";
import colorChange from "../modules/colorChange";

const rootReducer = combineReducers({
  stateRedux,
  colorChange,
});
const store = createStore(rootReducer);

export default store;
