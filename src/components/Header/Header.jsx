import { Link } from 'react-router-dom';

let Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/addproduct">Add Product</Link>
        </li>
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
        <li>
          <Link to="/auth/forgot-password">Reset Password</Link>
        </li>
        <li>
          <Link to="/auth/reset-password/dea70e32-7304-4a89-ba01-5407d455e96d">
            Reset-Password Form
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
