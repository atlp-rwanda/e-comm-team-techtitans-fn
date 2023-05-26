import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/Auth/ForgotPassword.scss';

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  const backToLogin = () => {
    navigate('/auth/login');
  };
  const backToReset = () => {
    navigate('/auth/forgot-password');
  };

  return (
    <div className="forgot-password-page">
      <form className="forgot-password-form">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
            alt="password-icon"
            className="form-top-image"
          />
        </div>
        <h1 className="forgot-password-title">Password reset</h1>
        <h3 className="form-description">
          Your password has successfully been reset. <br />
          <p className="new-password-page-description">Click below to login</p>
        </h3>
        <button
          type="submit"
          className="send-email-button"
          onClick={backToLogin}
        >
          Continue
        </button>
        <p className="back-to-login-text" onClick={backToReset}>
          <span>← </span> Want another password reset?
        </p>
      </form>
    </div>
  );
};

export default PasswordResetSuccess;
