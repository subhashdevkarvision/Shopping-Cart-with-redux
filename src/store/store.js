import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Features/featureSlice";

export const store = configureStore({
  reducer: productReducer,
});
