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

let allRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<Auth allowedRoles={["admin", "seller"]} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:userId"
          element={<ResetPasswordForm />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listusers" element={<ListUser />} />
        <Route path="/product/:id" element={<SingleDashboard />} />
        <Route path="/dashboard/productsList" element={<SellersDashboard />} />
        <Route path="/review" element={<ReviewComponent />} />
        <Route path="/listusers/:id" element={<ListUser />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} />
        <Route path="/buyer/product/:id" element={<BuyerSingleProduct />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default allRoutes;
