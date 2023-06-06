import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import success from './images/success.svg';
import { SpinerButtonWhite } from './Spinner2';

const SuccessfulPaymentContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBackToHomeLoading, setIsBackToHomeLoading] = useState(false);
  const navigate = useNavigate();

  const backToHomePage = () => {
    setIsBackToHomeLoading(true);

    // This timeout function is just for the Loader demonstration purposes
    setTimeout(() => {
      // navigate('/');
      navigate('/');
      setIsBackToHomeLoading(false);
    }, 2000);
  };

  const invoicePreview = () => {
    alert('This is the Invoice Preview');
  };
  return (
    <div className="shipping-page-content">
      <div className="shipping-page-left-side">
        <h2 className="payment-form-title">
          <span className="page-indication">3/3:</span> Successful Payment!
        </h2>

        <p className="success-page-paragraph">
          Thank you for your purchase from Techtitans Ecommerce! Your payment
          has been successfully processed, and we are thrilled to have you as
          our valued customer. Our team is already working diligently to prepare
          your order for shipment and you will receive a confirmation email
          shortly with all the details.
        </p>

        <div className="action-buttons">
          {isLoading ? (
            <SpinerButtonWhite />
          ) : (
            <button
              className="payment-continue-button"
              onClick={invoicePreview}
            >
              Invoice Preview
            </button>
          )}
          {isBackToHomeLoading ? (
            <SpinerButtonWhite />
          ) : (
            <button className="payment-cancel-button" onClick={backToHomePage}>
              Back Home
            </button>
          )}
        </div>
      </div>
      <div className="right-side">
        <img src={success} alt="success-svg" className="success-svg" />
      </div>
    </div>
  );
};

export default SuccessfulPaymentContent;
