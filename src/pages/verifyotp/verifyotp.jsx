import "../../styles/verifyotp.scss";
import Button from "../../components/button";
import { IoMdUnlock } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
import { useState } from 'react';
import { fetchUsers } from '../../Redux/Features/verifyotp.slice';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../components/Theme/ThemeContext';
import { useContext } from 'react';
import Header from '../../components/Header/Header';
import { login } from "../../Redux/Features/User/loginSlice";

let VerifyOtp = ({ socket }) => {
  const {theme}=useContext(ThemeContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  let email = localStorage.getItem("email");
  let [otp, setOtp] = useState("");
  let [message, setMessage] = useState("");
  let [go, setGo] = useState(false);
  const dispatch = useDispatch();
  const inUser = useSelector((state) => state);
  const [resendText, setResendText] = useState("Resend OTP?");
  const { email: storedEmail, password } = useSelector((state) => state.user.user?.credentials);
  
  if (go) {
    navigate("/dashboard");
  }

  let handleSubmit = () => {
    dispatch(fetchUsers({ otp, setMessage, setGo, email, socket }));
  };

  let handleChange = (e) => {
    setOtp(e.target.value);
    setMessage("");
    setResendText("Resend OTP?")
  };
  const handleResendOTP =() =>{
    setMessage("");
    setResendText("Resending...");
    dispatch(login({email:storedEmail,password }))
      .then((response) =>{
        if (response && response.payload.message === 'Please enter your OTP') {
          setResendText("check your email again!");
        }
       
      })
      .catch((error) => console.log('Login error:', error));
  }

  return (
    <>
    <Header/>
    <div className="container" id={theme}>
      <div className="left">
        <div className="center">
          <h1>
            Account <br />
            Verification
          </h1>
          <p>
              we have sent a code to your email <br />
              {`${email.substring(0, 2)}${"*".repeat(
                email.indexOf("@") - 4
              )}${email.substring(
                email.indexOf("@") - 2,
                email.indexOf("@")
              )}${email.substring(email.indexOf("@"))}`}
            </p>
        </div>
      </div>
      <div className="right">
        <div className="box">
          <ul>
            <li className="centerLock">
              <IoMdUnlock id="openlock" />
            </li>
            <li id="codeText">Enter Your Code</li>
            <li id="allIn">
              <label>Code</label>
              <br />
              <div className="input-lock">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </li>
            <li>
              <div className="error-message-otp">
              <p id="errorMessage">{message}</p>
              </div>
            </li>
            <li className="btn">
              <Button verify={"verify"} handleSubmit={handleSubmit} />
            </li>
            <div className="resend-otp" onClick={handleResendOTP}>
            <p>{resendText}</p>
            </div>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default VerifyOtp;