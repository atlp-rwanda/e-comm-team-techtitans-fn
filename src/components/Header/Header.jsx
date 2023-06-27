import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Logo from "../../assets/images/Logo.svg";
import GoogleTranslate from "./GoogleTranslate/GoogleTranslate";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Searching from "../../pages/SearchIntegrations/search";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from "react";
import LogoDark from "../../assets/images/LogoDark.svg";
import PaymentsIcon from "@mui/icons-material/Payments";

let Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileLink, setShowProfileLink] = useState(true);
  const [isLoggedIn, setsLoggedIn] = useState(true);

  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const linkStyle = {
    fontWeight: 800,
    fontSize: 15,
    color: isHomePage ? "#7a89e9" : "#555555",
  };

  const isCategory = location.pathname === "/categories";
  const linkStyleCategory = {
    fontWeight: 800,
    fontSize: 15,
    color: isCategory ? "#7a89e9" : "#555555",
  };

  const isAbout = location.pathname === "/about";
  const linkStyleAbout = {
    fontWeight: 800,
    fontSize: 15,
    color: isAbout ? "#7a89e9" : "#555555",
  };

  const isContactPage = location.pathname === "/contact";
  const linkStyleContact = {
    fontWeight: 800,
    fontSize: 15,
    color: isContactPage ? "#7a89e9" : "#555555",
  };

  const isProfilePage = location.pathname === "/profile";
  const linkStyleProfile = {
    fontWeight: 800,
    fontSize: 15,
    color: isProfilePage ? "#7a89e9" : "#555555",
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setsLoggedIn(token !== null && token !== "");
    setShowProfileLink(token !== null && token !== "");
  }, []);
  return (
    <div className="header" id={theme}>
      <div className="header_main">
        <p style={{ color: "white" }}>Free shipping order over 1000$</p>
        <div className="header_main--two">
          <p>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    {...bindTrigger(popupState)}
                    style={{
                      color: "#ffffff",
                      background: "#222222",
                      fontSize: 11.2,
                    }}
                  >
                    Account
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <Link className="nav_link" to="/auth/login">
                      <MenuItem onClick={popupState.close}>Login</MenuItem>
                    </Link>
                    <Divider />
                    <Link className="nav_link" to="/auth/login">
                      <MenuItem onClick={popupState.close}>Logout</MenuItem>
                    </Link>
                    <Divider />
                    <Link
                      className="nav_link"
                      to="/signup"
                      style={{ color: "blue" }}
                      style={{ color: "blue" }}
                    >
                      <MenuItem onClick={popupState.close}>Register</MenuItem>
                    </Link>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </p>
          <p style={{ ...{ color: "#ffffff" }, ...{ paddingTop: "7px" } }}>
            EN
          </p>
        </div>
      </div>
      <nav className="nav">
        <div className="nav_logo">
          {theme === "dark" ? (
            <img src={LogoDark} />
          ) : (
            <img src={Logo} alt="Logo" />
          )}
        </div>
        <ul
          className={isMobile ? "nav_links-mobile" : "nav_links"}
          onClick={() => setIsMobile(false)}
        >
          <li>
            <Link className="nav_link" to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav_link"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={linkStyleCategory}
            >
              Categories
            </Link>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Electronics</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Clothes</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Jewelleries</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Furnitures</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Accessories</MenuItem>
            </Menu>
          </li>
          <li>
            <Link className="nav_link" to="/about" style={linkStyleAbout}>
              About
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/contact" style={linkStyleContact}>
              Contact
            </Link>
          </li>

          <li>
            {isLoggedIn && showProfileLink && (
              <Link className="nav_link" to="/profile" style={linkStyleProfile}>
                Profile
              </Link>
            )}
          </li>
        </ul>
        <div className="switch">
          <DarkModeSwitch
            onChange={toggleTheme}
            checked={theme === "dark"}
            className="nav_link"
          />
        </div>
        <div className="icons">
          <div className="search-container">
            <Searching className="search-icon-button nav_link" />
          </div>
          <div className="cart-icon">
            <Link to="/viewcart">
              <ShoppingCartIcon />
            </Link>
          </div>
          <div className="iconContainer">
            <div className="like-icon">
              <Link to="/wishlist">
                <FavoriteBorderIcon className="nav_link" />{" "}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </div>
      </nav>
    </div>
  );
};
export default Header;
