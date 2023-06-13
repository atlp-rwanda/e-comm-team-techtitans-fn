import React from "react";
import "./Footer.scss";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from "react";
const Footer = () => {
  const { theme} = useContext(ThemeContext);
  return (
    <div className="footer" id={theme}>
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-categories">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Clothes
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Shoes
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Furniture
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Jewelly
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-help">
            <h3>Help</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Track
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Shipping
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-touch">
            <h3>Get IN TOUCH</h3>
            <p>
              Any questions? Let us know in store at 8th floor, 379 Kicukiro St,
              Kigali, Kgl 10018 or call us on (+250) 785 910 902
            </p>
            <div className="icons-social">
              <FacebookSharpIcon />
              <InstagramIcon />
              <TwitterIcon />
              <LinkedInIcon />
            </div>
          </div>
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <input type="email" placeholder="email" />
            <a href="#" className="button">
              SUBSCRIBE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
