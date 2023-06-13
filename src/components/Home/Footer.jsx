import React from "react";
import { footerDetails } from "../../Data/dummy";
import "../../variables/variables.scss";
import "./Homepage.scss";

const Footer = () => {
  return (
    <div className="Footer-container">
      <div className="footer-category">
        <div className="division">
          <div className="categories">
            <h3 className="category-footer">Categories</h3>
            <ul className="ulist">
              <li>Electronics</li> <br />
              <li>Clothes</li> <br />
              <li>Furniture</li>
            </ul>
          </div>
        </div>

        <div className="division">
          <div className="help">
            <h3 className="footer-header">Help</h3>
            <ul className="ulist">
              <li>Shipping</li>
              <li>Track</li>
            </ul>
          </div>
        </div>

        <div className="division">
          <div className="in-touch">
            <h3 className="footer-header">GET IN TOUCH</h3>
            <p>
              Let us know in store at 8th floor, <br />
              379 Kicukiro St, Kigali, Kgl <br />
              10018 or call us on (+250) 785 910 902
            </p>
          </div>
        </div>

        <div className="division">
          <div className="newsletter">
            <h3 className="footer-header">NewsLetter</h3>
            <ul>
              <li>email</li>
            </ul>
            <button className="subscribe">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div>Copyright ©2023 All rights reserved | made by TechTitans</div>
      </div>
    </div>
  );
};

export default Footer;
