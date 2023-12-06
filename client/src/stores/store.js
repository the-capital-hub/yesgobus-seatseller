import { configureStore } from "@reduxjs/toolkit";
import designReducer from "./slices/designSlice";


export const store = configureStore({
  reducer: {
    design: designReducer,
  },
});
