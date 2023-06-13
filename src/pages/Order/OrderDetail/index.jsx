import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "../../Home/Home.scss";
import "../../../components/Content/content.scss";
import OrderContent from "../../../components/Content/OrderContent.jsx";
import OrderDetailCard from "../../../components/Card/OrderDetailCard";
import "./orderdetail.scss";
import AddressCard from "../../../components/Card/AddressCard";
import HorizontalStepper from "../../../components/stepper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrder } from "../../../Redux/Features/Order/getOrder.slice";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("https://ecommerce-tech-titans.herokuapp.com");
const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  const [orderStatus, setOrderStatus] = useState("");
  useEffect(() => {
    socket.on("orderStatusUpdated", (data) => {
      setOrderStatus(data);
    });
    console.log("orderStatus", orderStatus);
  }, [orderStatus]);
  return (
    <main>
      <Header />

      <OrderContent>
        {status === "loading" ? (
          <div>Loading orders...</div>
        ) : status === "failed" ? (
          <div>Error: {error.data}</div>
        ) : (
          <>
            <div className="order-header">
              <div>
                <h4>
                  Seller:{" "}
                  {order.data && order.data.product.productVendor.fullname}
                </h4>
              </div>

              <div>
                <h4>
                  <span>
                    <i className="bx bx-calendar-event"></i>
                  </span>{" "}
                  Estimated Delivery:{" "}
                  {order.data &&
                    order.data.expected_delivery_date.split("T")[0]}
                </h4>
              </div>
              <div>
                <button> Customer Service</button>
              </div>
            </div>

            <HorizontalStepper orderStatus={orderStatus} />

            <OrderDetailCard
              productName={order.data && order.data.product.name}
              price={order.data && order.data.product.price}
              quantity={order.data && order.data.quantity}
              total={order.data && order.data.total}
              image={order.data && order.data.product.images[0]}
            />
            <div className="order-footer">
              <AddressCard
                title="Payment"
                method="MasterCard ***56"
                icon="bx bxl-mastercard"
                buttonText="Invoice"
                buttonIcon="bx bx-file"
              />
              <AddressCard
                title="Delivery"
                icon="bx bxs-map"
                address="Address"
                addressOne="847 San Jose Bridge Apt, 174"
                addressTwo="San Jose, CA 95112"
                addressThree="United States"
              />
            </div>
          </>
        )}
      </OrderContent>

      <Footer />
    </main>
  );
};

export default OrderDetails;
