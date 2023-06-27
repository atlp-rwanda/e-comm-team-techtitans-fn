import PropTypes from "prop-types";
import "../../styles/order.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBuyerOrder } from "../../Redux/Features/Order/deleteOrder.slice";
import { message } from "antd";
import { getAllBuyerOrder } from "../../Redux/Features/Order/buyerOrder.slice";

function OrderCard({
  sellerName,
  productName,
  status,
  price,
  quantity,
  image,
  description,
  orderId,
  expiryDate,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("orderId", orderId);
  const handleSubmit = () => {
    dispatch(
      deleteBuyerOrder({
        id: orderId,
      })
    );
    dispatch(getAllBuyerOrder());
    message.success("Order Successfully deleted");
    navigate(`/orders`);
  };

  const handleViewDetail = () => {
    navigate(`/order/${orderId}`);
  };
  return (
    <div className="card-container-order">
      <div className="card-header">
        <div className="seller-name">
          <p>Seller: {sellerName}</p>
        </div>
        <div className="order-date">
          <p>Estimated delivery: {expiryDate}</p>
        </div>
        <div className="order-status">
          <p>
            Order Status: <span className="sub-span">{status}</span>
          </p>
        </div>
      </div>
      <div className="card-body">
        {/* <div className="card-image"> */}
        <img src={image} alt="" />
        {/* </div> */}

        <div className="card-body-content">
          <div className="card-left">
            <h3>{productName}</h3>
            <p className="description-container">Description: {description}</p>
            <button onClick={handleViewDetail}>view detail</button>
          </div>
          <div className="card-right">
            <p>Price: {price}</p>
            <p>Quantity: {quantity}</p>
            <button onClick={handleSubmit}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  sellerName: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
};
export default OrderCard;
