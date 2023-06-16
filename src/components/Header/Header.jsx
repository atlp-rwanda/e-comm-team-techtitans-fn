import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Logo from '../../assets/images/Logo.svg';
import GoogleTranslate from './GoogleTranslate/GoogleTranslate';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Searching from '../../pages/SearchIntegrations/search';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../Theme/ThemeContext';
import { useContext } from 'react';
import LogoDark from '../../assets/images/LogoDark.svg';

let Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileLink, setShowProfileLink] = useState(true);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setShowProfileLink(token !== null && token !== '');
  }, []);

  return (
    <div className="header" id={theme}>
      <div className="header_main">
        <p style={{ color: 'white' }}>Free shipping order over 1000$</p>
        <div className="header_main--two">
          <p>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="contained"
                    {...bindTrigger(popupState)}
                    style={({ color: 'white' }, { background: 'black' })}
                  >
                    Account
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <Link className="nav_link" to="/auth/login">
                      <MenuItem onClick={popupState.close}>Login</MenuItem>
                    </Link>
                    <Divider />

                    <Link className="nav_link" to="#">
                      <MenuItem onClick={popupState.close}>Logout</MenuItem>
                    </Link>
                    <Divider />
                    <Link
                      className="nav_link"
                      to="/signup"
                      style={{ color: 'blue' }}
                    >
                      <MenuItem onClick={popupState.close}>Register</MenuItem>
                    </Link>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </p>
          <p style={{ color: 'white' }}>EN</p>
        </div>
      </div>
      <nav className="nav">
        <div className="nav_logo">
          {theme === 'dark' ? (
            <img src={LogoDark} />
          ) : (
            <img src={Logo} alt="Logo" />
          )}
        </div>
        <ul
          className={isMobile ? 'nav_links-mobile' : 'nav_links'}
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
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
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
                'aria-labelledby': 'basic-button',
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

          <li style={{ display: showProfileLink ? 'block' : 'none' }}>
            <Link className="nav_link" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
        <div className="switch">
          <DarkModeSwitch onChange={toggleTheme} checked={theme === 'dark'} />
        </div>
        <div className="icons">
          <div className="icon-search">
            <Searching className="search-icon-button" />
          </div>

          <div className="cart-icon">
            <Link to="/orders">
              <ShoppingCartIcon />
            </Link>
          </div>
          <div className="iconContainer">
            <div className="iconContainer-number">
              <p></p>
            </div>
            <div className="like-icon">
              <Link to="/wishlist">
                <FavoriteBorderIcon />{' '}
              </Link>
            </div>
          </div>
          <div className="checkout-icon">
            <Link to="/checkout">
              <span className="login-text-navbar">💳</span>
            </Link>
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
