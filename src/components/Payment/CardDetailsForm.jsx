import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SpinerButtonPurple } from './Spinner1';
import { SpinerButtonWhite } from './Spinner2';
import OrderSummary from './OrderSummary';
import { paymentDetails } from '../../Redux/Features/Payment/paymentSlice';

import '../../scss/Payment/CardDetails.scss';

const CardDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const [isBackToShipmentDetails, setIsBackToShipmentDetails] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToShipmentDetails = () => {
    setIsBackToShipmentDetails(true);

    // This timeout function is just for the Loader demonstration purposes, will be removed after integration
    setTimeout(() => {
      navigate('/checkout');
      setIsBackToShipmentDetails(false);
    }, 2000);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);

    const input = event.target.value;
    const formattedInput = input
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, '$1 / $2');

    setExpiryDate(formattedInput);
  };

  const handleCvcChange = (event) => {
    setCvc(event.target.value);
  };

  const handleCvcBlur = (event) => {
    const value = event.target.value;

    if (value.trim() !== '' && value.length !== 3) {
      toast.warning('Please enter a valid CVC (3 digits)');
    }
  };
  const handleCardNumberBlur = (event) => {
    const value = event.target.value;

    if (value.length !== 16) {
      toast.warning('The Card number should have 16 digits)');
    }
    setCardNumber(value);
  };

  const handlePayment = async () => {
    setIsPaymentLoading(true);

    const response = await dispatch(
      paymentDetails({
        cvc,
        cardNumber,
      }),
    );

    localStorage.setItem(
      'invoicePreview',
      JSON.stringify(response.payload.charge.receipt_url),
    );

    setIsPaymentLoading(false);
    navigate('/payment/success');
  };

  return (
    <div className="shipping-page-content">
      <div className="shipping-page-left-side">
        <h2 className="payment-form-title">
          <span className="payment-pageIndication">2/3:</span> Enter your Card
          Details
        </h2>

        <p className="payment-details-paragraph">
          To finalize your payment, kindly complete your payment using a valid
          credit card below.
        </p>

        {/* Card Number input */}
        <div className="card-number-part">
          <label htmlFor="cardNumber">Card Number </label>
          <input
            // this 👇🏽 shouldn't be "type=number" since we need to allow spaces in every 4 digits we input
            // type="number"
            maxLength={16}
            placeholder="9870  8880  8880  8880"
            className="input-styles card-number-input"
            value={cardNumber}
            onBlur={handleCardNumberBlur}
            onChange={handleCardNumberChange}
          />
        </div>

        {/* Expiry date input */}
        <div className="expiry-cvc-part">
          <div className="grid-input-and-label">
            <label htmlFor="expiry-date">Expiry </label>
            <input
              type="text"
              id="expiry-date"
              className="input-styles card-expiry-date-input"
              placeholder="MM / YY"
              maxLength={7}
              value={expiryDate}
              onChange={handleExpiryDateChange}
            />
          </div>
          {/* CVC input */}
          <div className="grid-input-and-label cvc-input-and-label">
            <label htmlFor="expiry-date">CVC </label>
            <input
              type="password"
              className="input-styles"
              placeholder="1 2 3"
              maxLength={3}
              value={cvc}
              onBlur={handleCvcBlur}
              onChange={handleCvcChange}
            />
          </div>
        </div>

        <div className="card-details-action-buttons">
          {isPaymentLoading ? (
            <SpinerButtonPurple />
          ) : (
            <button className="payment-continue-button" onClick={handlePayment}>
              Pay
            </button>
          )}
          <button
            className="card-details-back-button"
            onClick={backToShipmentDetails}
          >
            {isBackToShipmentDetails ? 'Loading...' : 'Back'}
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="right-side-order-summary">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CardDetailsForm;
