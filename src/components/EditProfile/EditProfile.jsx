/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfile } from "../../Redux/Features/Profile/profile.slice";
import profileImage from '../../assets/ishimwe.png'
import './EditProfile.scss'
import { GetProfile } from "../../Redux/Features/Profile/getprofile.slice.jsx";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('');
  const [billingAddress, setbillingAddress] = useState('');
  const [location, setLocation] = useState('');
  const { getprofile } = useSelector((state) => state.getprofile);
  const {state, error, profile} = useSelector((state) => state.profile)
  // const [images, setImages] = useState('');;

  const handleSubmit = (event) => {
    event.preventDefault();

    
 dispatch(
       UpdateProfile({
            
            gender,
            birthdate,
            preferredLanguage,
            preferredCurrency,
            location,
            billingAddress
        })

    )
};
  useEffect(()=> {
    dispatch(GetProfile())
  },[dispatch])
  console.log("This is the profile", getprofile)
  if (!getprofile) {
    return null; // or return a message indicating that the product doesn't exist
  }
  const {
    fullname,
    email,
  } = getprofile
  return (
    <div className="profile-container">
    
     
    {/* <div className="profile"> */}
      <div className="profile-image">
      <img src={profileImage} alt="image" />
      <div className='file'>
        <label htmlFor='file-upload' className='img-upload'>Change avatar</label>
        <input type='file' id='file-upload' name='avatar' 
             />
        </div>
      {/* <p>{error}</p> */}
        <div className="profile-name">
        <div className="profile-description">
        <span className="person-email">{email}</span>
          <span className="person-name">{fullname}</span>
        </div>
          
        </div>
      </div>
      <div className='personal-info'>
          
          <form className="profile-form" onSubmit={handleSubmit}>
          <div className="div-form">
        <label>currency:</label>
        <select name="currency" value={preferredCurrency} onChange={(e) => setPreferredCurrency(e.target.value)}>
          <option value="RWF">RWF</option> <option value="USD">USD</option>
          <option value="EURO">EURO</option>
        </select>
        <label>language:</label>
        <select name="lunguage" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)}>
          <option value="English">English</option>
          <option value="french">french</option>
          <option value="kinyarwanda">kinyarwanda</option>
        </select>
        <label>location</label>
        <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Kigali">Kigali</option>
          <option value="new york">new york</option>
          <option value="los angeles">los angeles</option>
        </select>
        <label>billingAddress</label>
        <select name="billingAdrress" value={billingAddress} onChange={(e) => setbillingAddress(e.target.value)}>
          <option value="Kigali">Kigali</option>
          <option value="new york">new york</option>
          <option value="los angeles">los angeles</option>
        </select>
        <label>gender:</label>
        <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="MALE">Male</option>
          <option value="Female">female</option>
          <option value="EURO">EURO</option>
        </select>
        <label>birthDate:</label>
        <input type="date" value={birthdate}  onChange={(e) => setBirthDate(e.target.value)}/>
        </div>
        <button type="submit" className='btn'>Save</button>
      </form>
      
            </div>
           
     
    </div>
    // </div>
  );
};

export default UserProfile;