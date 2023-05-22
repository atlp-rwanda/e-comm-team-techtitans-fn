import React from 'react';
import '../../scss/Auth/LoginPage.scss';
import Categories from '../Categories/Categories.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  // Function to route to FP page
  const forgotPassword = () => {
    navigate('/auth/forgot-password');
  };

  const buttonClick = () => {
    alert('Please forget your password first');
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <button type="submit" onClick={buttonClick}>
          Login
        </button>
        <p className="forgot-password" onClick={forgotPassword}>
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default Login;
