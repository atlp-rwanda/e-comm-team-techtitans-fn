import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { SpinerButtonPurple } from './Spinner1';
import { SpinerButtonWhite } from './Spinner2';
import '../../scss/Payment/CardDetails.scss';
import OrderSummary from './OrderSummary';

const CardDetailsForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isBackToShipmentDetails, setIsBackToShipmentDetails] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const backToShipmentDetails = () => {
    setIsBackToShipmentDetails(true);

    // This timeout function is just for the Loader demonstration purposes, will be removed after integration
    setTimeout(() => {
      navigate('/checkout');
      setIsBackToShipmentDetails(false);
    }, 2000);
  };

  const handleCardNumberChange = (event) => {
    // remove exisiting spaces from the input value
    const input = event.target.value.replace(/\s/g, '');
    let formattedInput = '';

    for (let i = 0; i < input.length; i++) {
      // add a space after every 4 digits
      if (i > 0 && i % 4 === 0) {
        formattedInput += ' ';
      }
      formattedInput += input[i];
    }

    setCardNumber(formattedInput);
  };

  const handleExpiryDateChange = (event) => {
    const input = event.target.value;
    const formattedInput = input
      .replace(/\D/g, '') // Remove non-digit characters
      .slice(0, 4) // Limit input to 4 characters
      .replace(/(\d{2})(\d{0,2})/, '$1 / $2'); // Insert "/" between month and year

    setExpiryDate(formattedInput);
  };

  const handlePayment = async (data) => {
    console.log(data);
    if (data.cardNumber === '') {
      toast.warning('Please enter your card number');
    } else if (data.expirydate === '') {
      toast.warning('Please input the expiry date');
    } else if (data.cvc === '') {
      toast.warning('Please enter card CVC');
    } else {
      setIsPaymentLoading(true);

      setTimeout(() => {
        setIsPaymentLoading(false);
        navigate('/payment/success');
      }, 2000);
    }
  };

  return (
    <div className="shipping-page-content">
      <div className="shipping-page-left-side">
        <h2 className="payment-form-title">
          <span className="page-indication">2/3:</span> Enter your Card Details
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
            type="text"
            pattern="\d*"
            maxLength={19}
            placeholder="9870  8880  8880  8880"
            className="input-styles card-number-input"
            value={cardNumber}
            onChange={handleCardNumberChange}
            {...register('cardNumber')}
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
              {...register('expirydate')}
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
              {...register('cvc')}
            />
          </div>
        </div>

        <div className="card-details-action-buttons">
          {isPaymentLoading ? (
            <SpinerButtonPurple />
          ) : (
            <button
              className="payment-continue-button"
              onClick={handleSubmit(handlePayment)}
            >
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
