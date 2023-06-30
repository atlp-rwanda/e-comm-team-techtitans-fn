import '../../variables/variables.scss';
import './Homepage.scss';
import logo from '../../images/vector.jpg';
// import searchh from "./search.svg";
// import heart from "./heart.svg";
import cart from '../../images/cart.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="header-container">
      <div className="nav-logo">
        {/* <Link to="/"> */}
        <img className="logo-logo" src={logo} alt="" />
        <h3 className="tech-titans">
          <span className="titans">Tech</span>-Titans
        </h3>
        {/* </Link> */}
      </div>

      <div className="nav-container">
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Categories</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="nav-icons">
        {/* <div className="search-icons" >
        <img src={searchh} alt="" />
        </div>
        <div className="heart-icons">
        <img src={heart} alt="" />
        </div> */}
        <div>
          <img className="cart-icons" src={cart} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
