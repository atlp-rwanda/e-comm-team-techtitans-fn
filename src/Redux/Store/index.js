import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginExampleSlice from "../Features/example.slice";
import verifyotpSlice from "../Features/verifyotp.slice";
// import usersReducer, { fetchUsers } from "../Features/user.slice";

const middlewares = [];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    example: loginExampleSlice,
    verifyOtp: verifyotpSlice,
  },
  middleware: [...middlewares, thunk],
});

// store.dispatch(fetchUsers());

export default store;
