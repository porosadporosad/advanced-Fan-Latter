import { createSlice } from "@reduxjs/toolkit";

// const BTN_COLOR = "BTNCOLOR";
// const CLICKMAINCOLOR = "CLICKMAINCOLOR";

// export const btn_Color = (payload) => {
//   return {
//     type: BTN_COLOR,
//     payload,
//   };
// };

// export const click_Main_Color = (payload) => {
//   return {
//     type: CLICKMAINCOLOR,
//     payload,
//   };
// };

// 초기 상태값
const initialState = {
  btnColor: {
    son: "yellow",
    kim: "black",
    lee: "black",
    hwang: "black",
  },
  clickMainColor: "son",
};

// 리듀서
// const colorChange = (state = initialState, action) => {
//   switch (action.type) {
//     case BTN_COLOR:
//       return {
//         ...state,
//         btnColor: action.payload,
//       };
//     case CLICKMAINCOLOR:
//       return {
//         ...state,
//         clickMainColor: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const colorChangeSlice = createSlice({
  name: "colorChange",
  initialState,
  reducers: {
    btn_Color: (state, action) => {
      state.btnColor = action.payload;
    },
    click_Main_Color: (state, action) => {
      state.clickMainColor = action.payload;
    },
  },
});

export default colorChangeSlice.reducer;
export const { btn_Color, click_Main_Color } = colorChangeSlice.actions;
