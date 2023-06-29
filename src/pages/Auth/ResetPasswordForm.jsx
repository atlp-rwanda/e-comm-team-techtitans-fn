import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { resetPassword } from '../../Redux/Features/passwordResetSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/Auth/ForgotPassword.scss';
import { TailSpin } from 'react-loader-spinner';

import PasswordResetSuccess from './PasswordResetSuccess';

const ResetPassword = () => {
  let [response, setResponse] = useState({ status: 0 });
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const backToLogin = () => {
    navigate('/auth/login');
  };

  const handleResetPassword = async (data) => {
    const { password, confirmPassword } = data;
    const { userId } = params;

    // Input validation
    if (!password) {
      toast.error('Please enter your password');
      return;
    } else if (!confirmPassword) {
      toast.error('Please confirm your password');
      return;
    } else if (
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
      )
    ) {
      toast.error(
        'Your password must contain at least 1 uppercase, 1 lowercase, 1 digit, and one case character.',
      );
      return;
    } else if (password !== confirmPassword) {
      toast.error('Passwords must match');
      return;
    } else {
      setIsResetSuccess(true);
      setTimeout(async () => {
        await dispatch(
          resetPassword({ password, confirmPassword, userId }),
        ).unwrap();
        toast.success('Password reset successful');
        setIsResetSuccess(false);
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container>
      {isResetSuccess ? (
        <PasswordResetSuccess />
      ) : (
        <div className="forgot-password-page">
          <form
            className="forgot-password-form"
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <div>
              <img
                src="https://seglko.org/assets/images/icons/forgot-2.png"
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
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                placeholder="New Password"
                className="send-email-input"
              />
            </div>
            {errors.password && (
              <p className="validation-error-text">
                Please enter your password
              </p>
            )}
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', { required: true })}
                className="send-email-input"
              />
              {errors.confirmPassword && (
                <p className="validation-error-text">
                  Please confirm your password
                </p>
              )}
            </div>

            <button type="submit" className="send-email-button">
              {isResetSuccess ? (
                <TailSpin
                  height="25"
                  width="25"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                'Reset password'
              )}
            </button>
            <div className="below-the-submit-button">
              <p className="back-to-login-text" onClick={backToLogin}>
                <span>← </span> Back to login
              </p>
              <p
                className="show-password-emoji"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '😐' : '😑'}
              </p>
            </div>
          </form>
        </div>
      )}
    </Container>
  );
};

export default ResetPassword;
