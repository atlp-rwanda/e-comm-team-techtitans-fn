import React from 'react';

export function Spinner() {
  return (
    <div className="loader-container">
      <div className="loader">Loading...</div>
    </div>
  );
}
export function SpinerButtonPurple() {
  return (
    <button className="payment-continue-button">
      <Spinner />
    </button>
  );
}
