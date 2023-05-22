import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories/Categories.jsx";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import VerifyOtp from "../pages/verifyotp/verifyotp.jsx";
import Auth from "../components/protectedRoute.jsx";
import UnauthorizedPage from "../pages/unauthorizedPage.jsx";
import AddProductForm from "../pages/Product/AddProduct";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import ResetPasswordForm from "../pages/Auth/ResetPasswordForm.jsx";
import { ToastContainer } from "react-toastify";
import Login from "../pages/User/Login.jsx";
import SignupForm from "../pages/Auth/SignUp.jsx";
import ListUser from "../pages/ListofUser";
import Dashboard from "../pages/Dashboard/index.jsx";
import SingleDashboard from "../pages/Dashboard/SingleDashboard.jsx";
import SellersDashboard from "../pages/Dashboard/SellersDashboard.jsx";
import ReviewComponent from "../components/Review/ReviewProduct.jsx";
import ChangePasswordPage from "../pages/changePasswordPage.jsx";
import BuyerSingleProduct from "../pages/Shop/BuyerSingleProduct.jsx";
import NotificationDashboard from "../pages/Dashboard/SellersNotification.jsx";
import UserProfile from "../pages/Profile/UserProfile/UserProfile.jsx";
import EditProfile from "../pages/Profile/EditProfile/EditProfile.jsx";
import HomeChat from "../components/chatTestFolder/HomeChat.jsx";
import socketIO from "socket.io-client";
import ChatingPage from "../components/chat/chats/chatingPage.jsx";
import { SOCKET_URL } from "../utils/apiUtilis.js";

const socket = socketIO.connect(`${SOCKET_URL}`);

import CancelPayment from '../pages/Payment/CancelPayment';
import Checkout from '../pages/Payment/Checkout';
import SuccessfulPayment from '../pages/Payment/SuccessfulPayment';
import CardDetails from '../pages/Payment/CardDetails.jsx';



let allRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomeChat socket={socket} />} /> */}
        <Route element={<Auth allowedRoles={["admin", "seller", "buyer"]} />}>
          <Route path="/chat" element={<ChatingPage socket={socket} />} />
        </Route>
        {/* <Route path="/chat" element={<ChatPage socket={socket} />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<Auth allowedRoles={['admin', 'seller']} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/addproduct" element={<AddProductForm />} />

        <Route element={<Auth allowedRoles={["admin", "seller"]} />}>
          <Route path="/categories" element={<Categories />} />
        </Route>

        <Route path="/verifyotp" element={<VerifyOtp socket={socket} />} />
        <Route path="/auth/login" element={<Login socket={socket} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:userId"
          element={<ResetPasswordForm />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listusers" element={<ListUser />} />
        <Route path="/product/:id" element={<SingleDashboard />} />
        <Route path="/product/buyer/:id" element={<DisplayProducts />} />
        <Route path="/dashboard/productsList" element={<SellersDashboard />} />
        <Route path="/review" element={<ReviewComponent />} />
        <Route path="/listusers/:id" element={<ListUser />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<CardDetails />} />
        <Route path="/payment/success" element={<SuccessfulPayment />} />
        <Route path="/payment/cancelled" element={<CancelPayment />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} />
        <Route path="/buyer/product/:id" element={<BuyerSingleProduct />} />
        <Route
          path="/dashboard/notification"
          element={<NotificationDashboard />}
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/updateprofile" element={<EditProfile />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default allRoutes;
