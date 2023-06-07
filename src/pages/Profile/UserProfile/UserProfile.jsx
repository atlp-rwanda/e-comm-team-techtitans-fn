/* eslint-disable prettier/prettier */import {  } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import { Link,} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GetProfile } from "../../../Redux/Features/Profile/getprofile.slice";
import { logout } from "../../../Redux/Features/User/logoutSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import Header from "../../../components/Header/Header";
import './UserProfile.scss'

import { useEffect } from 'react';
const UserProfile = () => {
  const { getprofile, status, error } = useSelector((state) => state.getprofile);

    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    useEffect(()=> {
      dispatch(GetProfile())
    },[dispatch])
  console.log("This is the profile", getprofile)
  if (!getprofile) {
    return null; 
  }
  const {
    id,
    fullname,
    email,
    image,
    gender,
    birthdate,
    preferredLanguage,
    preferredCurrency,
    location,
    billingAddress
  } = getprofile
  console.log("This is the profile", id)
  return (
    <div className="profile">
    <Header/>

        <div className="dropdown-menu" >
          
          <ul className="flex-gap">
            <LogoutIcon/>
            <li onClick={async () => {
          await dispatch(logout()).unwrap();
          navigate('/auth/login');
        }}>Logout</li>
          </ul>
        </div>
   
    <div className="profile-container">
  
      <div className="profile-image">
      <img src={image} />
        <div className="profile-name">
        
        <div className="profile-description">
       
        <span className="person-email">{email}</span>
        <span className="person-name">{fullname}</span>
         
        </div>
          
        </div>
      </div>
      <div className='personal-info'>
            <div className="div-left">
                <p>gender:</p>
                <p>Language:</p>
                <p>Currency:</p>
                <p>Birthdate:</p>
                <p>location</p>
                <p>billingaddress:</p>
                </div>
                <div className='div-right'>
                <p>{gender}</p>
                <p>{preferredLanguage}</p>
                <p>{preferredCurrency}</p>
                <p>{birthdate}</p>
                <p>{location}</p>
                <p>{billingAddress}</p>
               
                </div>
              
            </div>
          
            <div className='edit-btn-button'><a href='/updateprofile' className='link-edit'>edit profile</a></div>
    </div>
    
    </div>
  );
};

export default UserProfile;