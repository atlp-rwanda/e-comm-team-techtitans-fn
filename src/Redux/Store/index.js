import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import resetPasswordReducer from "../Features/passwordResetSlice";
import verifyotpSlice from "../Features/verifyotp.slice";
import CategoryReducer from "../../Redux/Features/Product/CategorySlice";
import productReducer from "../../Redux/Features/Product/AddProductSlice";
import loginReducer from "../Features/User/loginSlice";
import loginExampleSlice from "../Features/example.slice";
import ProfileSlice from "../Features/Profile/profile.slice";
import GetProfileSlice from "../Features/Profile/getprofile.slice";

const middleware = [...getDefaultMiddleware(), thunk];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    verifyOtp: verifyotpSlice,
    category: CategoryReducer,
    product: productReducer,
    user: loginReducer,
    example: loginExampleSlice,
    profile: ProfileSlice,
    getprofile: GetProfileSlice,
  },
  middleware,
});

export default store;
