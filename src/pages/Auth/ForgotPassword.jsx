import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetLink } from '../../Redux/Features/passwordResetSlice';
import '../../scss/Auth/ForgotPassword.scss';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, resetField } = useForm();

  const navigate = useNavigate();

  const backToLogin = () => {
    navigate('/auth/login');
  };

  const handleResetPassword = async (data) => {
    if (data.email === '') {
      alert('Please enter the email to which the reset link will be sent');
    } else if (
      !data.email.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
      )
    ) {
      alert('Please enter the a valid email address');
    } else {
      console.log('**THE DATA**', data);
      setIsLoading(true);

      await dispatch(sendResetLink(data))
        .unwrap()
        .then(() => {
          setIsLoading(false);

          alert('Email sent');
        })
        .catch((error) => {
          setIsLoading(false);
          // Handle error
          console.log('Reset password error:', error);
        });
    }
  };

  return (
    <div className="forgot-password-page">
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
