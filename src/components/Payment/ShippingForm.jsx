import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shipping from './images/shipping.svg';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SpinerButtonPurple } from './Spinner1';
import { SpinerButtonWhite } from './Spinner2';
import { useDispatch } from 'react-redux';
import { shippingDetails } from '../../Redux/Features/Payment/paymentSlice';

import '../../scss/Payment/checkoutPage.scss';

const ShippingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelPaymentLoading, setIsCancelPaymentLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cancelPayment = () => {
    setIsCancelPaymentLoading(true);

    navigate('/orders');
    setIsCancelPaymentLoading(false);
  };

  const handleShippingDetails = async (data) => {
    try {
      if (data.names === '') {
        toast.warning('Please enter the recepient name');
      } else if (data.shippingAddress === '') {
        toast.warning('Please enter the shipping address');
      } else if (data.telephoneNumber === '') {
        toast.warning('Please enter the phone number');
      } else if (data.shippingMethod === '') {
        toast.warning('Please select a shipping method');
      } else {
        setIsLoading(true);

        const checkIsBuyNow = localStorage.getItem('fromBuyNow');
        let theOrderToken;

        if (checkIsBuyNow === 'true') {
          theOrderToken = JSON.parse(localStorage.getItem('buyNowToken'));
        } else {
          theOrderToken = JSON.parse(
            localStorage.getItem('cartToCheckoutToken'),
          );
        }

        setTimeout(async () => {
          const response = await dispatch(
            shippingDetails({
              receiverName: data.names,
              address: data.shippingAddress,
              phoneNumber: data.telephoneNumber,
              shippingMethod: data.shippingMethod,
              orderToken: theOrderToken,
            }),
          );

          localStorage.setItem(
            'payToken',
            JSON.stringify(response.payload.payToken),
          );
          localStorage.setItem('orderToken', JSON.stringify(theOrderToken));

          navigate('/payment');
          setIsLoading(false);
        }, 2000);
      }
    } catch (error) {
      toast.error(error);
      return error;
    }
  };

  return (
    <div className="shipping-page-content">
      <div className="shipping-page-left-side">
        <h2 className="payment-form-title">
          <span className="payment-pageIndication">1/3:</span> Shipping Address
        </h2>
        <div className="name-part">
          <label htmlFor="names">Names </label>
          <input
            type="text"
            placeholder="Smith Carter"
            className="input-style"
            {...register('names')}
          />
        </div>

        <div className="address-part">
          <label htmlFor="address1">Shipping Address </label>
          <input
            type="text"
            placeholder="34, Newton Road"
            className="input-style"
            {...register('shippingAddress')}
          />
        </div>

        <div className="phone-part">
          <label htmlFor="phoneNumber">Tel No. </label>
          <input
            type="number"
            placeholder="+250 ... ..."
            className="input-style"
            {...register('telephoneNumber')}
          />
        </div>
        <div className="shipping-method-part">
          <label htmlFor="shippingMethod">Shipping Method </label>
          <select
            className="shipping-methods input-style"
            {...register('shippingMethod')}
          >
            <option value="">Select an option </option>
            <option value="In-store Pickups">In-store Pickup</option>
            <option value="Doorstep Delivery">Doorstep delivery</option>
          </select>
        </div>
        <div className="action-buttons">
          {/* Button 1 👇🏽 */}
          {isLoading ? (
            <SpinerButtonPurple />
          ) : (
            <button
              className="payment-continue-button"
              onClick={handleSubmit(handleShippingDetails)}
            >
              Continue
            </button>
          )}
          {/* Button 2 👇🏽 */}
          {isCancelPaymentLoading ? (
            <SpinerButtonWhite />
          ) : (
            <button className="payment-cancel-button" onClick={cancelPayment}>
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="right-side">
        <img src={shipping} alt="shipping-picture" className="shipping-svg" />
      </div>
    </div>
  );
};

export default ShippingForm;
