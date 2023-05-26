import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import resetPasswordReducer from '../Features/passwordResetSlice';
import verifyotpSlice from '../Features/verifyotp.slice';
import CategoryReducer from '../../Redux/Features/Product/CategorySlice';
import productReducer from '../../Redux/Features/Product/AddProductSlice';
import loginReducer from '../Features/User/loginSlice';
const middlewares = [];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    verifyOtp: verifyotpSlice,
    category: CategoryReducer,
    product: productReducer,
    user: loginReducer
  },
  middleware: () => [...middlewares, thunk],
});

// store.dispatch(fetchUsers());

export default store;
