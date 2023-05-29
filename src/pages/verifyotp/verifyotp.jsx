import "../../styles/verifyotp.scss";
import Button from "../../components/button";
import { IoMdUnlock } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
import { useState } from "react";
import { fetchUsers } from "../../Redux/Features/verifyotp.slice";
import { useNavigate } from "react-router-dom";

let VerifyOtp = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  let email = localStorage.getItem('email')
  let [otp, setOtp] = useState("");
  let [message, setMessage] = useState("");
  let [go, setGo] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);
  if (go) {
    navigate("/shop");
  }

  let handleSubmit = () => {
    dispatch(fetchUsers({ otp, setMessage, setGo, email }));
  };

  let handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="center">
          <h1>
            Account <br />
            Verification
          </h1>
          <p>
            we have sent a code to your email <br />
            te****ns@gmailcom
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
                <p></p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </li>
            <li className="btn">
              <Button verify={"verify"} handleSubmit={handleSubmit} />
            </li>
            <li>
              <p id="errorMessage">{message}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;