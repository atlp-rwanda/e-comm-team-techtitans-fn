/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateProfile } from "../../../Redux/Features/Profile/profile.slice";
import './EditProfile.scss';
import { GetProfile } from "../../../Redux/Features/Profile/getprofile.slice";
import { message } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


const DashBoardEditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gender, setGender] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('');
  const [billingAddress, setbillingAddress] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('')
  const { getprofile } = useSelector((state) => state.getprofile);
  const { status, error, profile } = useSelector((state) => state.profile);




  let imageUrl;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gwkladqc');

    // Upload image to Cloudinary
    fetch('https://api.cloudinary.com/v1_1/dgcmsqndb/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        imageUrl = `https://res.cloudinary.com/dgcmsqndb/image/upload/${data.public_id}`;
        setImage(imageUrl);

      })

      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  useEffect(() => {
    dispatch(GetProfile())
  }, [dispatch])
  // console.log("This is the profile", getprofile)
  if (!getprofile) {
    return null;
  }
  const {
    fullname,
    email,
  } = getprofile


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('***imageprofile***', imageUrl);

    dispatch(
      UpdateProfile({
        image,
        gender,
        birthdate,

        preferredLanguage,
        preferredCurrency,
        location,
        billingAddress
      })

    )
    message.success("Profile updated successfully")
    navigate("/dashboard");
  };




  if (status === "loading" || getprofile === null) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#7A89E9", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => { }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
   
  return (
    <div>


      <div className="edit_profile--container">
        <div className="edit_profile">
          <div className="edit_profile--image">
            <img src={image} />
            <div className='file'>
              <label htmlFor='file-upload' className='img-upload'>Change avatar</label>
              <input type='file' id='file-upload' name='avatar' onChange={handleImageUpload} />
            </div>
          </div>
          <div className="edit_profile--description">
            <h5>{email}</h5>
            <p>{fullname}</p>
          </div>
          <form className="edit_profile--form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="div-form">
                <label>Currency:</label>
                <select value={preferredCurrency} defaultValue={preferredCurrency} onChange={(e) => setPreferredCurrency(e.target.value)}>
                  <option value="">Select currency</option>
                  <option value="RWF">RWF </option>
                  <option value="EUR">Euro</option>
                  <option value="USD">USD (US Dollar)</option>
                </select>
              </div>

              <div className="div-form">
                <label>Language:</label>
                <select value={preferredLanguage} defaultValue={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)}>
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Swahili">Swahili</option>
                  <option value="Kinyarwanda">Kinyarwanda</option>
                </select>
              </div>

              <div className="div-form">
                <label>Location:</label>
                <select value={location} defaultValue={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Select location</option>
                  <option value="Northern Province">Northern Province</option>
                  <option value="Southern Province">Southern Province</option>
                  <option value="Western Province">Western Province</option>
                  <option value="Eastern Province">Eastern Province</option>
                  <option value="Kigali City">Kigali City</option>
                </select>
              </div>

              <div className="div-form">
                <label>billingAddress</label>

                <input type="input" value={billingAddress} defaultValue={billingAddress} onChange={(e) => setbillingAddress(e.target.value)} />

              </div>
              <div className="div-form">
                <label>birthDate:</label>
                {/* <input type="date" value={formattedExpiryDate} defaultValue={formattedExpiryDate}  onChange={(e) => setBirthDate(e.target.value)}/> */}
                <input type="date" value={birthdate} defaultValue={birthdate} onChange={(e) => setBirthDate(e.target.value.substring(0, 10))} />
              </div>
              <div className="div-form">
                <label>Gender:</label>
                <select value={gender} defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

            </div>
            <div className='edit-btn-button'><button type="submit" className='link-edit'>Save</button></div>
          </form>
        </div>
      </div>



    </div>
    // </div>
  );
};

export default DashBoardEditProfile;