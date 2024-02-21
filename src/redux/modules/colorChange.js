import { createSlice } from "@reduxjs/toolkit";

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
