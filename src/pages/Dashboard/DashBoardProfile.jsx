/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */import {  } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import { Link,} from 'react-router-dom';
import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import { GetProfile } from "../../Redux/Features/Profile/getprofile.slice";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import '../Profile/UserProfile/UserProfile.scss'

import { useEffect } from 'react';
const DashBoardProfile = () => {
  const { getprofile, status, error } = useSelector((state) => state.getprofile);

    const dispatch = useDispatch();
   
 
    useEffect(()=> {
      dispatch(GetProfile())
    },[dispatch])
    const getInitials = (name) => {
      const names = name.split(' ');
      const initials = names.map((name) => {
        if (name.length > 0) {
          return name[0].toUpperCase();
        }
      });
      return initials.join('');
    };
    
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
  // console.log("This is the profile", id)

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
   
    <div className="interface" id="interface">
        {/* <NavBar /> */}
        <Content>
        
      <h1 style={{color: "#7a89e9"}}>Profile</h1>
    <div className="profile">
   
   
    <div className="profile-container">
  
      <div className="profile-image">
      <div className="image-initials">
      {image ? (
    <img src={image} alt="Profile" />
  ) : (
    <div className="initials-name">
    <div className="initials">{getInitials(fullname)}</div>
    </div>
  )}
      </div>
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
          
            <div className='edit-btn-button'><Link to='/dashboardupdateprofile' className='link-edit'>Edit Profile</Link></div>
    </div>
    
    </div>
    </Content>
        <SideBar />
      {/* </div> */}
      </div>
  );
};

export default DashBoardProfile;