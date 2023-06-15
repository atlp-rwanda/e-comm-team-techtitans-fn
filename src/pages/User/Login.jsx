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
import LogoDark from "../../assets/images/LogoDark.svg";
const handleLogin = () => {
  window.open(`${BASE_URL}/api/v1/auth/google/callback`, "_self");
};

const Login = ({ socket }) => {
  const { theme } = useContext(ThemeContext);
  const [PasswordInputType, ToggleIcon] = UsePasswordToggle();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        if (response && response.payload.message === "Please enter your OTP") {
          setIsLoggedIn(true);
          navigate("/verifyotp");
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
          navigate("/");
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => console.log("Login error:", error));
  };

  return (
    <>
      <Header />
      <div className="login-section" id={theme}>
        {status === "loading....." && <div className="process">Loading...</div>}
        {status === "failed" && (
          <div
            className="error"
            style={{
              width: "100%",
              textAlign: "right",
              display: "flex",
              justifyContent: "right",
            }}
          >
            {" "}
            <Stack sx={{ width: "30%" }} spacing={2}>
              <Alert severity="warning">{error}</Alert>
            </Stack>
          </div>
        )}
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
                    {theme === "dark" ? (
                      <img src={LogoDark} />
                    ) : (
                      <img src={Logo} />
                    )}
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
                    <a href="#" className="gmail-btn">
                      <img
                        src={googleIcon}
                        alt="gmail logo"
                        className="googleLogo"
                      />
                      Sign in with Google
                    </a>
                  </div>

                  <p className="account-not">
                    Don't have an account?{" "}
                    <Link to="/signup" className="registerText">
                      Register
                    </Link>
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