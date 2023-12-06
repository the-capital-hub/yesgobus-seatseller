import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileApp: false,
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setIsMobileApp: (state, action) => {
      state.isMobileApp = action.payload;
    },
  },
});

// Selectors
export const selectIsMobileApp = (state) => state.design.isMobileApp;

export const { setIsMobileApp } = designSlice.actions;

export default designSlice.reducer;
