import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Categories from "../pages/Categories/Categories.jsx";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import VerifyOtp from "../pages/verifyotp/verifyotp.jsx";
import Auth from "../components/protectedRoute.jsx";
import UnauthorizedPage from "../pages/unauthorizedPage.jsx";
import AddProductForm from "../pages/Product/AddProduct";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import ResetPasswordForm from "../pages/Auth/ResetPasswordForm.jsx";
import { resetPasswordPath } from "../utils/routeExtensions";

export const getRoutes = () => [
  React.createElement(Route, { path: "/", element: React.createElement(Home) }),
  React.createElement(Route, {
    path: "/categories",
    element: React.createElement(Categories),
  }),
  React.createElement(Route, {
    path: "/unauthorized",
    element: React.createElement(UnauthorizedPage),
  }),
  React.createElement(Route, {
    element: React.createElement(Auth, { allowedRoles: ["admin", "seller"] }),
  }),
  React.createElement(Route, {
    path: "/shop",
    element: React.createElement(Shop),
  }),
  React.createElement(Route, {
    path: "/addproduct",
    element: React.createElement(AddProductForm),
  }),
  React.createElement(Route, {
    path: "/verifyotp",
    element: React.createElement(VerifyOtp),
  }),
  React.createElement(Route, {
    path: "/categories",
    element: React.createElement(Categories),
  }),
  React.createElement(Route, {
    path: "/auth/login",
    element: React.createElement(Login),
  }),
  React.createElement(Route, {
    path: "/auth/forgot-password",
    element: React.createElement(ForgotPassword),
  }),
  React.createElement(Route, {
    path: resetPasswordPath,
    element: React.createElement(ResetPasswordForm),
  }),
];

const allRoutes = () =>
  React.createElement(
    BrowserRouter,
    { basename: "/" },
    React.createElement(Routes, null, getRoutes())
  );

export default allRoutes;
