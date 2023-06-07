import React, { useState, useEffect } from 'react';
import '../../variables/variables.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Redux/Features/User/getOneUserSlice";
import decodeToken from "../../utils/decodeToken";
import checkPasswordExpiry from '../../utils/checkPasswordExpiry';
import { passwordExpirationTime } from '../../Constants';
const PasswordExpirationModal = () => {
  const [isPasswordExpired, setIsPasswordExpired] = useState(false);
  const dispatch = useDispatch();
  const { oneuser } = useSelector((state) => state.oneuser);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    try {
      const id = decodeToken().id;
      dispatch(getUser(id));
    } catch (error) {
     
    }
  }, [dispatch]);

  useEffect(() => {
    let TimeDifference;
    if (oneuser.data) {
      if (oneuser.data.lastPasswordUpdate !== null) {
        TimeDifference = checkPasswordExpiry(oneuser.data.lastPasswordUpdate);
      } else {
        TimeDifference = checkPasswordExpiry(oneuser.data.updatedAt);
      }
      if (TimeDifference >= passwordExpirationTime) {
        setIsPasswordExpired(true);
      }
      setIsLoading(false); 
    }
  }, [oneuser.data]);

  const handleChangePassword = () => {
    setIsPasswordExpired(false);
  };

  if (!oneuser.data || isLoading) {
    // Return loading state or null while loading
    return null;
  }

  if (!isPasswordExpired) {
    return null;
  }

  return (
    <div
      className="password-expiration-modal"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '20px', color: '#222222' }}>Your password has expired!</h2>
        <p style={{ marginBottom: '10px' }}>Please change your password and Log back in to continue.</p>
        
        <Link to="/changepassword">
        <button
          onClick={handleChangePassword}
          style={{
            backgroundColor: '#7A89E9',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            outline: 'none',
          }}
        >
          Change Password
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordExpirationModal;