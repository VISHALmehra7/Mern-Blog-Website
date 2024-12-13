import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";

const store = configureStore({
  reducer: {
    blogSlice: blogReducer,
  },
});

export default store;
