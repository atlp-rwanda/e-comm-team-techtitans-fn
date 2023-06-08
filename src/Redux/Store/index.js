import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import resetPasswordReducer from '../Features/passwordResetSlice';
import verifyotpSlice from '../Features/verifyotp.slice';
import CategoryReducer from '../../Redux/Features/Product/CategorySlice';
import productReducer from '../../Redux/Features/Product/AddProductSlice';
import loginReducer from '../Features/User/loginSlice';
import AlluserSlice from '../Features/User/viewUser/view.slice';
import setRoleSlice from '../Features/User/viewUser/setRole.slice';
import SignupSlice from '../../Redux/Features/signup/SignupSlice';
import setAccountStatusReducer from '../Features/User/accountStatusSlice';
import productsReviewSlice from '../../Redux/Features/Review/ProductReview';
import singleProductReducer from '../Features/Dashboard/singleProductSlice';
import productsReducer from '../Features/Dashboard/productsSlice';
import ProductDetailsReducer from '../Features/Product/EditProductSlice';
import { singleUserReducer } from "../Features/User/getOneUserSlice";
import ProfileSlice from "../Features/Profile/profile.slice";

import GetProfileSlice from "../Features/Profile/getprofile.slice";
import LogoutSlice from "../Features/User/logoutSlice";
const middleware = [...getDefaultMiddleware(), thunk];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    verifyOtp: verifyotpSlice,
    category: CategoryReducer,
    product: productReducer,
    user: loginReducer,
    allUsers: AlluserSlice,
    setRole: setRoleSlice,
    signup: SignupSlice,
    setAccount: setAccountStatusReducer,
    review: productsReviewSlice,
    singleProduct: singleProductReducer,
    products: productsReducer,
    productDetails: ProductDetailsReducer,
    oneuser: singleUserReducer,

    profile: ProfileSlice,
    getprofile: GetProfileSlice,
    logout: LogoutSlice,

  },
  middleware,
});

export default store;
