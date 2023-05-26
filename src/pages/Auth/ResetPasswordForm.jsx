import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { resetPassword } from '../../Redux/Features/passwordResetSlice';
import { useDispatch } from 'react-redux';
import '../../scss/Auth/ForgotPassword.scss';

import PasswordResetSuccess from './PasswordResetSuccess';

const ResetPassword = () => {
  const [response, setResponse] = useState({ status: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  let { userId } = useParams();
  userId = localStorage.getItem('userId');

  const backToLogin = () => {
    navigate('/auth/login');
  };

  const handleResetPassword = (data) => {
    const { password, confirmPassword } = data;

    // Input validation
    if (!password) {
      alert('Please enter your password');
      return;
    }

    if (!confirmPassword) {
      alert('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords must match');
      return;
    }

    dispatch(
      resetPassword({
        password,
        confirmPassword,
      }),
    );

    // Simulating response status
    setTimeout(() => {
      setResponse({ status: 200 });
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container>
      {response.status !== 200 ? (
        <div className="forgot-password-page">
          <form
            className="forgot-password-form"
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <div>
              <img
                src="https://w7.pngwing.com/pngs/490/346/png-transparent-computer-icons-the-icons-keys-miscellaneous-purple-text.png"
                alt="password-icon"
                className="form-top-image"
              />
            </div>
            <h1 className="forgot-password-title">Set new password</h1>
            <h3 className="form-description">
              Your new password must be different from <br />
              <p className="new-password-page-description">
                previously used passwords
              </p>
            </h3>
            <p className="input-labels">Password</p>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                placeholder="New Password"
              />
            </div>
            <p className="input-labels">Confirm Password</p>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', { required: true })}
              />
              <p
                className="show-password-text"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '👀' : '🙈'}
              </p>{' '}
              {/* <button
                type="button"
                className="show-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button> */}
            </div>
            <button type="submit" className="send-email-button">
              Reset password
            </button>
            <p className="back-to-login-text" onClick={backToLogin}>
              <span>← </span> Back to login
            </p>
          </form>
        </div>
      ) : (
        <PasswordResetSuccess />
      )}
    </Container>
  );
};

export default ResetPassword;
