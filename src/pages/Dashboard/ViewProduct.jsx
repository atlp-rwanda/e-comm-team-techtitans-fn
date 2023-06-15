import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import "../../styles/SellerProduct.scss";
const ViewProduct = ({ product }) => {
  return (
    <div className="single-wrapper">
      <Link to={`/product/${product.id}`} key={product.id}>
        <img src={product.images[0]} alt="product" />
      </Link>
      <p className="caption">{product.name}</p>
      <p className="price">${product.price}</p>
    </div>
  );
};

export default ViewProduct;
