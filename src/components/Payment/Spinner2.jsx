import React from 'react';

export function Spinner() {
  return (
    <div className="loader-container">
      <div className="loader">loading...</div>
    </div>
  );
}
export function SpinerButtonWhite() {
  return (
    <button className="payment-cancel-button">
      <Spinner />
    </button>
  );
}
