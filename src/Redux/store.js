import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Features/Dashboard/";
import singleProductReducer from "./Features/Dashboard/singleProductSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: singleProductReducer
  },
});

export default store;
