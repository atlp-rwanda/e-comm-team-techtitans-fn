import "../../../styles/order.scss";
import OrderCard from "../../../components/Card/OrderCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllBuyerOrder } from "../../../Redux/Features/Order/buyerOrder.slice";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("https://ecommerce-tech-titans.herokuapp.com");

function OrderContainer() {
  const dispatch = useDispatch();
  const { buyerOrders, status, error } = useSelector(
    (state) => state.buyerOrders
  );

  useEffect(() => {
    dispatch(getAllBuyerOrder()); // Dispatch the thunk action to fetch buyer orders
  }, [dispatch]);

  const [orderStatus, setOrderStatus] = useState("");
  useEffect(() => {
    socket.on("orderStatusUpdated", (data) => {
      setOrderStatus(data);
    });
    console.log("orderStatus", orderStatus);
  }, [orderStatus]);

  const formatDescription = (description) => {
    const words = description.split(" ");
    const truncatedWords = words.slice(0, 12);
    return truncatedWords.join(" ");
  };

  return (
    <div className="order-container">
      <menu>
        <li>All</li>
      </menu>
      {status === "loading" ? (
        <div>Loading orders...</div>
      ) : status === "failed" ? (
        <div className="order-error">
          <i className="bx bx-shopping-bag"></i> No orders available.
        </div>
      ) : buyerOrders && buyerOrders.data && buyerOrders.data.length > 0 ? (
        buyerOrders.data.map((order) => {
          const description = order.product.description;
          const truncatedDescription = formatDescription(description);
          const descriptionClass =
            description.split(" ").length <= 15 ? "single-line" : "multi-line";

          return (
            <OrderCard
              sellerName={order.product.productVendor.fullname}
              productName={order.product.name}
              status={order.orderStatus}
              price={order.product.price}
              description={truncatedDescription}
              expiryDate={order.orderExpectedDeliveryDate.split("T")[0]}
              image={order.product.images[0]}
              quantity={order.orderQuantity}
              key={order.orderId}
              orderId={order.orderId}
              className={descriptionClass}
            />
          );
        })
      ) : (
        <div>No orders available.</div>
      )}
    </div>
  );
}

export default OrderContainer;
