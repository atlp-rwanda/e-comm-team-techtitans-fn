import React from "react";
import { useNavigate } from "react-router-dom";
import shipping from "./images/shipping.svg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShippingDetails,
  cancelPayment,
  setLoading,
  setCancelPaymentLoading,
  setError,
} from "../../Redux/Features/checkout/Checkoutslice";
import { toast } from "react-toastify";
import "../../scss/Payment/checkoutPage.scss";
import { SpinerButtonPurple } from "./Spinner1";
import { SpinerButtonWhite } from "./Spinner2";

const ShippingForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoadingRedux = useSelector((state) => state.checkout.isLoading);
  const isCancelPaymentLoadingRedux = useSelector(
    (state) => state.checkout.isCancelPaymentLoading
  );
  const errorRedux = useSelector((state) => state.checkout.error);

  const handleFormSubmit = (data) => {
    if (
      !data.receiverName ||
      !data.address ||
      !data.phoneNumber ||
      !data.shippingMethod
    ) {
      toast.warning("Please fill out all required fields");
      return;
    }

    dispatch(handleShippingDetails(data)).then(() => {
      if (!errorRedux) {
        navigate("/payment"); // Replace "/payment" with the correct path to the payment page
      }
    });

    dispatch(setLoading(true));
    dispatch(setError(null));
  };

  const handleCancelPayment = () => {
    dispatch(cancelPayment());
    dispatch(setCancelPaymentLoading(true));
  };

  return (
    <div className="shipping-page-content">
      <div className="shipping-page-left-side">
        <h2 className="payment-form-title">
          <span className="page-indication">1/3:</span> Shipping Address
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="name-part">
            <label htmlFor="names">Names </label>
            <input
              type="text"
              placeholder="Smith Carter"
              className="input-style"
              {...register("receiverName")}
            />
          </div>

          <div className="address-part">
            <label htmlFor="address1">Shipping Address </label>
            <input
              type="text"
              placeholder="34, Newton Road"
              className="input-style"
              {...register("address")}
            />
          </div>

          <div className="phone-part">
            <label htmlFor="phoneNumber">Tel No. </label>
            <input
              type="tel"
              placeholder="+250 ... ..."
              className="input-style"
              {...register("phoneNumber")}
            />
          </div>

          <div className="shipping-method-part">
            <label htmlFor="shippingMethod">Shipping Method </label>
            <select
              className="shipping-methods input-style"
              {...register("shippingMethod")}
            >
              <option value="">Select an option</option>
              <option value="In-store Pickups">In-store Pickup</option>
              <option value="Doorstep Delivery">Doorstep delivery</option>
            </select>
          </div>
          <div className="action-buttons">
            {isLoadingRedux ? (
              <SpinerButtonPurple />
            ) : (
              <button className="payment-continue-button" type="submit">
                Continue
              </button>
            )}
            {isCancelPaymentLoadingRedux ? (
              <SpinerButtonWhite />
            ) : (
              <button
                className="payment-cancel-button"
                onClick={handleCancelPayment}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="right-side">
        <img src={shipping} alt="shipping-picture" className="shipping-svg" />
      </div>
    </div>
  );
};

export default ShippingForm;
