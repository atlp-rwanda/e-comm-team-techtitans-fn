import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories/Categories.jsx";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import VerifyOtp from "../pages/verifyotp/verifyotp.jsx";
import Auth from "../components/protectedRoute.jsx";
import UnauthorizedPage from "../pages/unauthorizedPage.jsx";
import AddProductForm from "../pages/Product";
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
import DisplayProducts from "../pages/Dashboard/DisplayProducts.jsx";
import NotificationDashboard from "../pages/Dashboard/SellersNotification.jsx";
import UserProfile from "../pages/Profile/UserProfile/UserProfile.jsx";
import EditProfile from "../pages/Profile/EditProfile/EditProfile.jsx";
import socketIO from "socket.io-client";
import ChatingPage from "../components/chat/chats/chatingPage.jsx";
import { SOCKET_URL } from "../utils/apiUtilis.js";
import CancelPayment from "../pages/Payment/CancelPayment";
import Checkout from "../pages/Payment/Checkout";
import SuccessfulPayment from "../pages/Payment/SuccessfulPayment";
import CardDetails from "../pages/Payment/CardDetails.jsx";
import SingleProduct from "../components/CartOperations/SingleProduct.jsx";
import YourCart from "../components/CartOperations/YourCart.jsx";
import ListOrder from "../pages/Order";
import BuyOrder from "../pages/Order/BuyerOrder";
import OrderDetails from "../pages/Order/OrderDetail";
import ReadNotification from "../pages/Dashboard/SingleNotification.jsx";
import ViewCart from "../pages/Cart";

import WishlistPage from "../pages/wishli/Wishlist";

import DashBoardProfile from "../pages/Profile/UserProfile/DashBoardProfile.jsx";
import DashBoardEditProfile from "../pages/Profile/EditProfile/DashBoardEditProfile.jsx";
import WelcomeComponent from "../components/aboutComponents/WelcomeComponent.jsx";
import MissionComponent from "../components/aboutComponents/MissionComponent.jsx";
import TeamComponent from "../components/aboutComponents/TeamComponent.jsx";
import AdvantagesComponent from "../components/aboutComponents/AdvantagesComponent.jsx";
import FaqsComponent from "../components/aboutComponents/FaqsComponent.jsx";

const socket = socketIO.connect(`${SOCKET_URL}`);

let allRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<Auth allowedRoles={["admin", "seller", "buyer"]} />}>
          <Route path="/chat" element={<ChatingPage socket={socket} />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<Auth allowedRoles={["admin", "seller"]} />} />
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
        <Route path="/dashboardprofile" element={<DashBoardProfile />} />
        <Route
          path="/dashboardupdateprofile"
          element={<DashBoardEditProfile />}
        />

        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/mycart" element={<YourCart />} />
        <Route path="/listorders" element={<ListOrder />} />
        <Route path="/orders" element={<BuyOrder />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/dashboard/notification/:id"
          element={<ReadNotification />}
        />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/about" element={<WelcomeComponent />} />
        <Route path="/about/mission" element={<MissionComponent />} />
        <Route path="/about/team" element={<TeamComponent />} />
        <Route path="/about/advantages" element={<AdvantagesComponent />} />
        <Route path="/about/faqs" element={<FaqsComponent />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default allRoutes;
