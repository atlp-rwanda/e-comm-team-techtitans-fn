/* eslint-disable prettier/prettier */import {  } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import { Link,} from 'react-router-dom'
import { GetProfile } from "../../Redux/Features/Profile/getprofile.slice";
import profileImage from '../../assets/ishimwe.png'
import './UserProfile.scss'
import { useEffect } from 'react';
const UserProfile = () => {
  const { getprofile, status, error } = useSelector((state) => state.getprofile);
  // const { id } = useParams();
  //   const navigate = useNavigate();
  //   // navigate('/editprofile');
    const dispatch = useDispatch();
  //   const {state, error, getProfile} = useSelector((state) => state.getProfile)
    useEffect(()=> {
      dispatch(GetProfile())
    },[dispatch])
  console.log("This is the profile", getprofile)
  if (!getprofile) {
    return null; // or return a message indicating that the product doesn't exist
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
    <div className="profile-container">
     
    {/* <div className="profile"> */}
      <div className="profile-image">
      <img src={image} alt="image" />
        <div className="profile-name">
        
        <div className="profile-description">
       
        <span className="person-email">{email}</span>
        <span className="person-name">{fullname}</span>
         
        </div>
          
        </div>
      </div>
      <div className='personal-info'>
            <div>
                <p>gender:</p>
                <p>preffered language:</p>
                <p>preffered currency:</p>
                <p>birth date:</p>
                <p>location</p>
                <p>billing address:</p>
                </div>
                <div>
                <p>{gender}</p>
                <p>{preferredLanguage}</p>
                <p>{preferredCurrency}</p>
                <p>{birthdate}</p>
                <p>{location}</p>
                <p>{billingAddress}</p>
                </div>
            </div>
            <Link to='/editprofile'><button type="button" className='btn'>edit profile</button></Link>
      
    </div>
    
  );
};

export default UserProfile;
