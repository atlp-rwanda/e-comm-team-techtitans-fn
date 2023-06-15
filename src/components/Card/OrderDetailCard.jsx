import PropTypes from "prop-types";
import "./orderDetail.scss";

function OrderDetailCard({ productName, price, quantity, total, image }) {
  return (
    <div className="card-container-detail">
      <div className="img-detail">
        <img src={image} alt="" />
      </div>
      <div className="content-body">
        <div className="detail-one">
          <p>{productName}</p>
          <p>Price: {price} $</p>
        </div>
        <div className="detail-two">
          <p>Total: {total} $</p>
          <p>Qty: {quantity}</p>
        </div>
      </div>
    </div>
  );
}

OrderDetailCard.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default OrderDetailCard;
