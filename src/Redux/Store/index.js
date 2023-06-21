import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import resetPasswordReducer from "../Features/passwordResetSlice";
import verifyotpSlice from "../Features/verifyotp.slice";
import CategoryReducer from "../../Redux/Features/Product/CategorySlice";
import productReducer from "../../Redux/Features/Product/AddProductSlice";
import loginReducer from "../Features/User/loginSlice";
import AlluserSlice from "../Features/User/viewUser/view.slice";
import setRoleSlice from "../Features/User/viewUser/setRole.slice";
import SignupSlice from "../../Redux/Features/signup/SignupSlice";
import setAccountStatusReducer from "../Features/User/accountStatusSlice";
import productsReviewSlice from "../../Redux/Features/Review/ProductReview";
import singleProductReducer from "../Features/Dashboard/singleProductSlice";
import productsReducer from "../Features/Dashboard/productsSlice";
import ProductDetailsReducer from "../Features/Product/EditProductSlice";
import { singleUserReducer } from "../Features/User/getOneUserSlice";
import GetProductsSlice from "../Features/Product/GetProducts.slice";
import GetCategoriesSlice from "../Features/Product/GetCategories.slice";
import DeleteProductReducer from "../Features/Product/DeleteProductSlice";

import ProfileSlice from "../Features/Profile/profile.slice";
import GetProfileSlice from "../Features/Profile/getprofile.slice";
import LogoutSlice from "../Features/User/logoutSlice";
import RecommendedProduct from "../Features/Product/RecommendedSlice";
import GetNoticationSlice from "../../Redux/Features/Notification/NotificationSlice";

import allmessagesSlice from "../Features/chat/allmessagesSlice";
import PaymentReducer from "../Features/Payment/paymentSlice";
import productsReviewAverageSlice from "../../Redux/Features/Review/GetAverageProductReview";
import productsReviewShowSlice from "../../Redux/Features/Review/GetProductReview";
import WishlistSlice from "../../Redux/Features/Wishlist/Wishlist";
import addProductToCartSlice from "../Features/Cart/CartSlice";
import checkoutSlice from "../Features/checkout/Checkoutslice";
import GetOneNotificationReducer from "../../Redux/Features/Notification/GetOneNotificationSlice"




import orderSlice from "../Features/Order/sellerOrder.slice.js";
import updateOrderStatusSlice from "../Features/Order/updateOrderStatus.slice";
import buyerOrderSlice from "../Features/Order/buyerOrder.slice";
import singleOrderSlice from "../Features/Order/getOrder.slice";
import viewProductCartSlice from "../Features/Cart/ViewCartSlice";
import ClearCartSlice from "../Features/Cart/ClearCartSlice";
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
    allUsers: AlluserSlice,
    setRole: setRoleSlice,
    signup: SignupSlice,
    getProducts: GetProductsSlice,
    getCategories: GetCategoriesSlice,
    setAccount: setAccountStatusReducer,
    review: productsReviewSlice,
    singleProduct: singleProductReducer,
    products: productsReducer,
    productDetails: ProductDetailsReducer,
    payment: PaymentReducer,
    oneuser: singleUserReducer,
    productDelete: DeleteProductReducer,
    profile: ProfileSlice,
    getprofile: GetProfileSlice,
    logout: LogoutSlice,
    recommended: RecommendedProduct,

    getnotification: GetNoticationSlice,
    allmessage: allmessagesSlice,
    reviewaverage: productsReviewAverageSlice,
    showreview: productsReviewShowSlice,
    wishlist: WishlistSlice,
    checkout: checkoutSlice,
    cart: addProductToCartSlice,
    orders: orderSlice,
    updateOrder: updateOrderStatusSlice,
    buyerOrders: buyerOrderSlice,
    order: singleOrderSlice,

    getnotification:GetNoticationSlice,
    oneNotification:GetOneNotificationReducer,
    showcart: viewProductCartSlice,
    clearcart:ClearCartSlice,

  },
  middleware,
});

export default store;
