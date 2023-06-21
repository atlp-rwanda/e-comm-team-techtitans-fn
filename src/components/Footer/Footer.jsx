import React from "react";
import { useEffect } from "react";
import "./Footer.scss";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GmailIcon from "@mui/icons-material/EmailTwoTone"
import { Link } from "react-router-dom";
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from "react";
const Footer = () => {
  const { theme } = useContext(ThemeContext);

  // useEffect(() => {
  //     window.scrollTo(0, 0);
  //   })
  return (
    <div className="footer" id={theme}>
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-categories">
            <h3>Useful Links</h3>
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
         
          <div className="footer-touch">
            <h3>Get IN TOUCH</h3>
            <p style={{ color: "white" }}>
              Any questions? Let us know on{" "}
              <Link to={'mailto:techtitansatlp@gmail.com'} className="linkToemail">techtitansatlp@gmail.com</Link>
            </p>
          </div>
          <div className="footer-newsletter">
          
            <p  style={{ color: "grey" }}>Discover the convenience of shopping with us! Our website offers a diverse selection of high-quality products, carefully curated to suit your needs. With competitive prices, exceptional service, and a commitment to customer satisfaction, we're here to provide you with a seamless and enjoyable shopping experience</p>
            <div className="email">
             
              <a href="/auth/login" className="button-join">
                JOIN  US
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p style={{ color: "white" }}>
          Copyright ©2023 All rights reserved | made by TechTitans
        </p>
      </div>
    </div>
  );
};
export default Footer;
