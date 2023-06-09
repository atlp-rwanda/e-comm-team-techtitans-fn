/* eslint-disable prettier/prettier */import {  } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import { Link,} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GetProfile } from "../../../Redux/Features/Profile/getprofile.slice";
import { logout } from "../../../Redux/Features/User/logoutSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    return `${day} . ${month} . ${year}`;
  };

  if (status === "loading" || getprofile === null) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#7A89E9", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

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
                <p>Gender:</p>
                <p>language:</p>
                <p>Currency:</p>
                <p>Birthdate:</p>
                <p>Location</p>
                <p>Billingaddress:</p>
                </div>
                <div className='div-right'>
                <p>{gender}</p>
                <p>{preferredLanguage}</p>
                <p>{preferredCurrency}</p>
                <p>{formatDate(birthdate)}</p>
                <p>{location}</p>
                <p>{billingAddress}</p>
               
                </div>
              
            </div>
          
            <div className='edit-btn-button'><Link to='/updateprofile' className='link-edit'>Edit Profile</Link></div>
    </div>
    
    </div>
  );
};

export default UserProfile;