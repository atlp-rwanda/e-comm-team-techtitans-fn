import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories/Categories.jsx";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import VerifyOtp from "../pages/verifyotp/verifyotp.jsx";
// import { UserView } from "../Redux/Features/userView.jsx";
import Auth from "../components/protectedRoute.jsx";
import UnauthorizedPage from "../pages/unauthorizedPage.jsx";
import AddProductForm from "../pages/Product/AddProduct";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import ResetPasswordForm from "../pages/Auth/ResetPasswordForm.jsx";
import { resetPasswordPath } from "../utils/routeExtensions";

function allRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route element={<Auth allowedRoles={["admin", "seller"]} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path={resetPasswordPath} element={<ResetPasswordForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default allRoutes;
