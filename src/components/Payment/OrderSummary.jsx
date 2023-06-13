import { orderProducts } from './dummy';
import '../../scss/Payment/OrderSummary.scss';

const OrderSummary = () => {
  return (
    <div className="order-summary-container">
      <p className="order-summary-title">ORDER SUMMARY</p>
      {orderProducts.map((item) => (
        <>
          <div className="order-summary-details">
            <img
              className="order-summary-image"
              src={item.productImage}
              alt={item.productName}
              key={item.productId}
            />
            <div className="order-summary-middle-section">
              <p className="order-summary-productName">{item.productName}</p>
              <p className="order-summary-productDescription">
                {item.productDescription}
              </p>
            </div>
            <div className="order-summary-right-section">
              <p className="order-summary-price">$ {item.price}</p>
              <p className="order-summary-qty">Qty: {item.quantity}</p>
            </div>
          </div>
        </>
      ))}
      <div className="order-summary-totals">
        <div className="order-subtotal-part">
          <p>Subtotal</p>
          <p className="order-subtotal-number">$397</p>
        </div>
        <div className="order-shipping-part">
          <p>Shipping</p>
          <p className="order-shipping-number">$0</p>
        </div>
        <div className="order-total-part">
          <p>Total</p>
          <p className="order-total-number">$379</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
