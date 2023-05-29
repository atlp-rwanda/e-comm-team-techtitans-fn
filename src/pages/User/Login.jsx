import React, { useState } from "react";
import './Login.scss';
import Logo from '../../assets/images/Logo.svg';
import googleIcon from '../../assets/images/google-icon.svg';
import UsePasswordToggle from "./usePasswordToggle";
import shopImg from '../../assets/images/shoplogoimg.svg'

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Features/User/loginSlice';
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [PasswordInputType, ToggleIcon] = UsePasswordToggle()
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.Error);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ email, password }))
            .then((response) => {
                console.log("Login response:", response)

                if (response && response.payload.message === 'Please enter your OTP') {
                    setIsLoggedIn(true);
                    navigate('/verifyotp');
                }
                if (response && response.payload.message === 'Login successful') {
                    localStorage.setItem('email', email);
                    setIsLoggedIn(true);
                    navigate('/');
                }

                else {
                    setIsLoggedIn(false);

                }

            })
            .catch((error) => console.log("Login error:", error));

    }

    return (
        <div className="login_container">
            <div className="login">
                <div className="login-right">
                    <img src={shopImg} alt='shop image' className="login-right_img" />

                </div>
                <div className="login-left">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-login_logo">
                            <h1><img src={Logo} /></h1>
                            <h3 className="login-text">Login</h3>
                            <p>Welcome back!</p>
                            <input placeholder="email" name="email" type="email" value={email}

                                onChange={(event) => setEmail(event.target.value)} required={true} />
                            <div className="passwordField">
                                <input placeholder="Password" type={PasswordInputType} name="password" value={password}
                                    required={true}
                                    onChange={(event) => setPassword(event.target.value)} />
                                <span className="password-toggle-icon">{ToggleIcon}</span>
                            </div>

                            <button type="submit" className="login-btn">Login</button>
                            {status === "loading....." && (
                                <div className="process">Loading...</div>
                            )}
                            {status === "failed" && <div className="error">{error}</div>}
                            {status === "success" && (
                                <div className="success">Product created successfully!</div>
                            )}
                            <a href="/auth/forgot-password" className="forgetText">Forgot Password ?</a>

                            <span className="or">OR</span>
                            <div className="gmailLogo">

                                <a href="#" className="gmail-btn"><img src={googleIcon} alt='gmail logo' className="googleLogo" />Sign in with Google</a>
                            </div>

                            <p className="account-not">Don't have an account? <a href="#" className="registerText">Register</a></p>


                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Login