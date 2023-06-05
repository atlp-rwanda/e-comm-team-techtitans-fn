import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
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

let Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header">
      <div className="header_main">
        <p>Free shipping order over 1000$</p>
        <div className="header_main--two">
          <p>Account</p>
          <p>EN</p>
        </div>
      </div>
      <nav className="nav">
        <div className="nav_logo">
          <img src={Logo} />
        </div>
        <ul
          className={isMobile ? "nav_links-mobile" : "nav_links"}
          onClick={() => setIsMobile(false)}
        >
          <li>
            <Link className="nav_link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/shop">
              Shop
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
            <Link className="nav_link" to="#">
              About
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/#">
              Contact
            </Link>
          </li>

          <li>
            <Link className="nav_link" to="/auth/login">
              Login
            </Link>
          </li>
        </ul>
        <div className="icons">
          <SearchIcon />
          <ShoppingCartIcon />
          <div className="iconContainer">
            <div className="iconContainer-number">
              <p>2</p>
            </div>
            <a href="/wishlist">
              <FavoriteBorderIcon />{" "}
            </a>
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
