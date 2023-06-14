import React, { useState, useEffect } from "react";
import "./Login.scss";
import Logo from "../../assets/images/Logo.svg";
import googleIcon from "../../assets/images/google-icon.svg";
import UsePasswordToggle from "./usePasswordToggle";
import shopImg from "../../assets/images/shoplogoimg.svg";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Features/User/loginSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/apiUtilis";
import jwt from "jwt-decode";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../components/Theme/ThemeContext";
import { useContext } from "react";
import LogoDark from '../../assets/images/LogoDark.svg'
const handleLogin = () => {
  window.open(`${BASE_URL}/api/v1/auth/google/callback`, '_self');
};

const Login = ({ socket }) => {
  const { theme } = useContext(ThemeContext);
  const [PasswordInputType, ToggleIcon] = UsePasswordToggle();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  // const allUsers = useSelector(
  //   (state) => state.allUserToChat?.allUsers?.data?.rows
  // );
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.Error);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const logeduser = allUsers.find((item) => item.email == email);
    dispatch(login({ email, password }))
      .then((response) => {
        if (response && response.payload.message === 'Please enter your OTP') {
          setIsLoggedIn(true);
          navigate('/verifyotp');
        }
        if (response && response.payload.message === "Login successful") {
          localStorage.setItem("email", email);
          const userCredential = jwt(localStorage.getItem("token"));
          localStorage.setItem("userIn", JSON.stringify(userCredential));
          socket.emit("newUser", {
            userName: userCredential.fullname,
            socketID: socket.id,
          });
          setIsLoggedIn(true);
          navigate('/');
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.log('Login error:', error));
  };

  return (
    <>
      <Header />
      <div className="login-section" id={theme}>
        {status === "loading....." && (
          <div className="process">Loading...</div>
        )}
        {status === "failed" && <div className="error" style={{ width: "100%", textAlign: "right", display: "flex", justifyContent: 'right' }}>
          {" "}
          <Stack sx={{ width: "30%" }} spacing={2}>
            <Alert severity="warning">{error}</Alert>
          </Stack>
        </div>}
        {status === "success" && (
          <div className="success">
            {" "}
            <Stack sx={{ width: "30%" }} spacing={2}>
              <Alert severity="success">User successfully logged In!</Alert>
            </Stack>

          </div>
        )}

        <div className="login_container">

          <div className="login">
            <div className="login-right">

              <img src={shopImg} alt="shop image" className="login-right_img" />
            </div>
            <div className="login-left">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-login_logo">
                  <h1>
                    {theme === 'dark' ? <img src={LogoDark} /> : <img src={Logo} />}
                  </h1>
                  <h3 className="login-text">Login</h3>
                  <p>Welcome back!</p>
                  <input
                    placeholder="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required={true}
                  />
                  <div className="passwordField">
                    <input
                      placeholder="Password"
                      type={PasswordInputType}
                      name="password"
                      value={password}
                      required={true}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="password-toggle-icon">{ToggleIcon}</span>
                  </div>

                  <button type="submit" className="login-btn">
                    Login
                  </button>

                  <Link to="/auth/forgot-password" className="forgetText">
                    Forgot Password ?
                  </Link>

                  <span className="or">OR</span>
                  <div className="gmailLogo">
                    <a href="#" className="gmail-btn" onClick={() => handleLogin()}>
                      <svg class="svg" width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill-rule="evenodd" fill-opacity="1" fill="#4285f4" stroke="none"></path><path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill-rule="evenodd" fill-opacity="1" fill="#34a853" stroke="none"></path><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill-rule="evenodd" fill-opacity="1" fill="#fbbc05" stroke="none"></path><path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill-rule="evenodd" fill-opacity="1" fill="#ea4335" stroke="none"></path></svg>&nbsp;&nbsp;
                      Sign in with Google
                    </a>
                  </div>

                  <p className="account-not">
                    Don't have an account?{" "}
                    <a href="#" className="registerText">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default Login;
