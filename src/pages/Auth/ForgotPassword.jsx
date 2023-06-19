import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendResetLink } from '../../Redux/Features/passwordResetSlice';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/Auth/ForgotPassword.scss';
import { ThemeContext } from '../../components/Theme/ThemeContext';
import { useContext } from 'react';

const ForgotPassword = () => {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, resetField } = useForm();

  const navigate = useNavigate();

  const backToLogin = () => {
    navigate('/auth/login');
  };

  const handleResetPassword = async (data) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (data.email === '') {
      toast.error('Please enter an email address');
    } else if (!data.email.match(emailPattern)) {
      toast.error('Please enter a valid email address');
    } else {
      setIsLoading(true);

      await dispatch(sendResetLink(data))
        .unwrap()
        .then(() => {
          setIsLoading(false);

          toast.success('Check your email for a password-reset link');
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="forgot-password-page" id={theme}>
      <form className="forgot-password-form">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4686/4686696.png"
            alt="password-icon"
            className="form-top-image"
          />
        </div>
        <h1 className="forgot-password-title">Forgot Password?</h1>
        <h3 className="form-description">
          No worries, we'll send you reset instructions
        </h3>
        <input
          type="email"
          {...register('email')}
          placeholder="Enter your email"
          className="send-email-input"
        />
        <button
          type="submit"
          className="send-email-button"
          onClick={handleSubmit(handleResetPassword)}
        >
          Reset password
        </button>
        <p className="back-to-login-text" onClick={backToLogin}>
          <span>← </span> Back to login
        </p>
      </form>
    </div>
  );
};
//   </Container>
// );
// };

export default ForgotPassword;
