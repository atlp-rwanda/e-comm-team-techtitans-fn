import "../../styles/verifyotp.scss";
import Button from "../../components/button";
import { IoMdUnlock } from "react-icons/io";

let VerifyOtp = () => {
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
                <input type="text" placeholder="********" />
              </div>
            </li>
            <li className="btn">
              <Button text={"verify"} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
