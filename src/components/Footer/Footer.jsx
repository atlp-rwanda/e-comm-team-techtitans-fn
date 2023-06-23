import React from "react";
import "./Footer.scss";
import { useEffect } from "react";
import "./Footer.scss";
import GmailIcon from "@mui/icons-material/EmailTwoTone"
import { Link } from "react-router-dom";
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from "react";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      <div className="footer" id={theme}>
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-categories">
              <h3>Categories</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/" className="footer-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about/mission" className="footer-link">
                    Mission and value
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login" className="footer-link">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/about/faqs" className="footer-link">
                    FAQs
                  </Link>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Our team
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
              <p style={{ color: "white" }}>
                Any questions? Let us know  <Link style={{ color: "white" }} to={'mailto:techtitansatlp@gmail.com'} className="linkToemail">techtitansatlp@gmail.com</Link> or call us on (+250) 785 910 902
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
              <div className="email">
                <input type="email" placeholder="email" />
                <div className="button-footer">
                  <a href="#" className="button-link-footer">
                    SUBSCRIBE
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="footer-copyright">
        <p>Copyright &copy;${year} All rights reserved | made by TechTitans</p>
      </div>
    </>
  );
};
export default Footer;
