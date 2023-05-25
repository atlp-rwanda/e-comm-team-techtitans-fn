import React from 'react';
import "./ChangePasswordForm.scss";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changePassword } from '../Redux/Features/User/getOneUserSlice';
import decodeToken from '../utils/decodeToken';
import { reset } from '../Redux/Features/User/getOneUserSlice';

const ChangePasswordForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [old_password, setOldPass] = useState("");
  const [new_password, setNewPass] = useState("");
  const [confirm_password, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const dispatch = useDispatch();
  const status = useSelector((state) => state.oneuser.status);
  const isUpdating = useSelector((state) => state.oneuser.isLoading);
  

  const navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const backToLogin = () => {
    navigate('/auth/login');
  localStorage.removeItem("token")
  };
  const handleChangePassword= async(event)=>{
    setErrorMessage(null)
    event.preventDefault();
    const id=decodeToken().id;
    if (!old_password) {
      setErrorMessage('Please enter your old password');
      return;
    } else if (!new_password) {
      setErrorMessage('Please enter your new password');
      return;
    } else if (confirm_password === '') {
      setErrorMessage('Please confirm your new password');
      return;
    } else if (!new_password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i)) {
      setErrorMessage('Your password must contain at least 1 uppercase, 1 lowercase, 1 digit, and one special character.');
      return;
    } 
    else if (old_password===new_password) {
      setErrorMessage('New password should be different from your old password');
      return;
    }
    else if (new_password !== confirm_password) {
      setErrorMessage('Passwords must match');
      return;
    } 
    else{
      try {
        setIsLoading(true);
        const resultAction = await dispatch(changePassword({ old_password, new_password, confirm_password, id }));
        const response = resultAction.payload;
        if(response.message.includes("not correct"))
        {
          toast.error(response.message); 
        }
        else{
          toast.success(response.message);
          backToLogin()
          dispatch(reset())
        }
        
      } catch (error) {
        toast.error('Failed to change password');
      } finally {
        setIsLoading(false);
      }
    }
  }

    return (
        <div>
           <div className='card-form'>
<div className="form-title">
 
 <span><span className="word-update">Update</span> Your Password</span>
 </div>

  <form className='password-form' onSubmit={handleChangePassword}>

    <div className='formgroup'>
      <label htmlFor='oldPassword'>Old Password</label>
     <input   type={passwordShown ? "text" : "password"} id='oldPassword' name='oldPassword' 
       value={old_password}
       onChange={(event) => setOldPass(event.target.value)}
      />
    </div>

    <div className='formgroup'>
      <label htmlFor='newPassword'>New Password</label>
      <input  type={passwordShown ? "text" : "password"} name='newPassword' 
       value={new_password}
       onChange={(event) => setNewPass(event.target.value)}
      />
    </div>
    <div className='formgroup'>
      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input type={passwordShown ? "text" : "password"} id='confirmPassword' name='confirmPassword' 
       value={confirm_password}
       onChange={(event) => setConfirmPass(event.target.value)}
      />
    </div>
    <div className='error-message' >
    {errorMessage && <p>{errorMessage}</p>}
    </div>
    <input type="checkbox" onClick={togglePassword}/> Show password
    <div className="button-container">
    <button type='submit'>
    {isUpdating ? 'Updating...' : 'Update'}
    </button>
    </div>
  
  </form>
</div> 
        </div>
    );
};

export default ChangePasswordForm;