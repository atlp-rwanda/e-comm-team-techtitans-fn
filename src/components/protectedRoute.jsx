import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import React from "react";

const Auth = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const auth = token ? jwtDecode(token) : null;
    const location = useLocation();
  
    if (!token) {
      return <Navigate to="/auth/login" replace />;
    }
  
    if (auth.roleId === 3) {
      auth.role = 'buyer';
    } else if (auth.roleId === 2) {
      auth.role = 'seller';
    } else if (auth.roleId === 1) {
      auth.role = 'admin';
    } else {
      auth.role = null;
    }
  
    return allowedRoles.find((role) => auth.role === role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
  };
  
  export default Auth;