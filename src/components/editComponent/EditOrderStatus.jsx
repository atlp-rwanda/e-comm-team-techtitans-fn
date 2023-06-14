import { useState } from "react";
import "./editModal.scss";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../Redux/Features/Order/updateOrderStatus.slice";
import { getAllSellerOrder } from "../../Redux/Features/Order/sellerOrder.slice";
import { message } from "antd";
import PropTypes from "prop-types";
import io from "socket.io-client";
// import BASE_URL from "../../utils/apiUtilis";
const socket = io.connect(`https://ecommerce-tech-titans.herokuapp.com`);
const EditModal = ({ orderId, closeModal }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  console.log("orderId", orderId);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  console.log("status", status);
  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      id: orderId,
      status: status,
    };
    console.log("data", data);
    try {
      await dispatch(updateOrderStatus(data));
      dispatch(getAllSellerOrder());
      socket.emit("orderStatusUpdated", data);
      message.success("Order status updated successfully");
      closeModal();
    } catch (error) {
      message.error("Failed to update order status. Please try again.");
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Order Status</h2>
        <div className="form-group">
          <label>Order Status</label>
          <select value={status} onChange={handleStatusChange}>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="canceled">canceled</option>
            <option value="refunded">refunded</option>
            <option value="onhold">onhold</option>
            <option value="returned">returned</option>
          </select>
        </div>
        <div className="buttons">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
EditModal.propTypes = {
  orderId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditModal;
