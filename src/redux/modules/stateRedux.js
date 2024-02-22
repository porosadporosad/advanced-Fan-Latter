import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { letterInstance } from "../../axios/api.js";

// 초기 상태값
const initialState = {
  fanLatterArr: [],
  colorPlayer: "son",
  filterdArr: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __fanLatterArray = createAsyncThunk(
  "FAN_LATTER_ARRAY_WAIT",
  async (payload, thunkAPI) => {
    try {
      const response = await letterInstance.get("/letters");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("dd", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const stateReduxSlice = createSlice({
  name: "stateRedux",
  initialState,
  reducers: {
    color_player: (state, action) => {
      state.colorPlayer = action.payload;
    },
    filterd_Arr: (state) => {
      const arr = state.fanLatterArr.filter(
        (prev) => prev.player === state.colorPlayer
      );
      state.filterdArr = arr;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__fanLatterArray.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__fanLatterArray.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.fanLatterArr = action.payload;
      })
      .addCase(__fanLatterArray.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default stateReduxSlice.reducer;
export const { color_player, filterd_Arr } = stateReduxSlice.actions;
