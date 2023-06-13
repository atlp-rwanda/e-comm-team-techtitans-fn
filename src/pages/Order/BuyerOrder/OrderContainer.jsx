import "../../../styles/order.scss";
import OrderCard from "../../../components/Card/OrderCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllBuyerOrder } from "../../../Redux/Features/Order/buyerOrder.slice";

function OrderContainer() {
  const dispatch = useDispatch();
  const { buyerOrders, status, error } = useSelector(
    (state) => state.buyerOrders
  );

  useEffect(() => {
    dispatch(getAllBuyerOrder()); // Dispatch the thunk action to fetch buyer orders
  }, [dispatch]);
  console.log("buyerOrders", buyerOrders);
  console.log("status:", status);
  console.log("error:", error);

  return (
    <div className="order-container">
      <menu>
        <li>All</li>
      </menu>
      {status === "loading" ? (
        <div>Loading orders...</div>
      ) : status === "failed" ? (
        <div>Error: {error}</div>
      ) : buyerOrders && buyerOrders.data && buyerOrders.data.length > 0 ? (
        buyerOrders.data.map((order) => (
          <OrderCard
            sellerName={order.product.productVendor.fullname}
            productName={order.product.name}
            status={order.orderStatus}
            price={order.product.price}
            description={order.product.description}
            expiryDate={order.orderExpectedDeliveryDate.split("T")[0]}
            image={order.product.images[0]}
            quantity={order.orderQuantity}
            key={order.orderId}
            orderId={order.orderId}
          />
        ))
      ) : (
        <div>No orders available.</div>
      )}
    </div>
  );
}

export default OrderContainer;
