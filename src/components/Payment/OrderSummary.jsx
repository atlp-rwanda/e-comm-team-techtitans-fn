import { orderProducts } from './dummy';
import jwt_decode from 'jwt-decode';
import '../../scss/Payment/OrderSummary.scss';

const OrderSummary = () => {
  const theOrderProducts = JSON.parse(localStorage.getItem('buyNowToken'));
  const tokenDetails = jwt_decode(theOrderProducts);

  console.log(tokenDetails);
  return (
    <div className="order-summary-container">
      <p className="order-summary-title">ORDER SUMMARY</p>
      <div className="order-summary-details">
        <img
          className="order-summary-image"
          src={tokenDetails.productImage}
          alt={tokenDetails.productName}
          key={tokenDetails.productId}
        />
        <div className="order-summary-middle-section">
          <p className="order-summary-productName">
            {tokenDetails.productName}
          </p>
          <p className="order-summary-productDescription">
            {tokenDetails.productDescription}
          </p>
        </div>
        <div className="order-summary-right-section">
          <p className="order-summary-price">$ {tokenDetails.productPrice}</p>
          <p className="order-summary-qty">
            Qty: {tokenDetails.quantityToBuyNow}
            {/* Qty: 1 */}
          </p>
        </div>
      </div>
      <div className="order-summary-totals">
        <div className="order-subtotal-part">
          <p>Subtotal</p>
          <p className="order-subtotal-number">${tokenDetails.total}</p>
        </div>
        <div className="order-shipping-part">
          <p>Shipping</p>
          <p className="order-shipping-number">$0</p>
        </div>
        <div className="order-total-part">
          <p>Total</p>
          <p className="order-total-number">${tokenDetails.total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

// import { orderProducts } from './dummy';
// import jwt_decode from 'jwt-decode';
// import '../../scss/Payment/OrderSummary.scss';

// const OrderSummary = () => {
//   const theOrderProducts = JSON.parse(localStorage.gettokenDetails('buyNowToken'));
//   const tokenDetails = jwt_decode(theOrderProducts);
//   console.log(tokenDetails);
//   return (
//     <div className="order-summary-container">
//       <p className="order-summary-title">ORDER SUMMARY</p>
//       {/* {orderProducts.map((tokenDetails, index) => ( */}
//       {theOrderProducts.map((tokenDetails, index) => (
//         <div className="order-summary-details" key={index}>
//           <img
//             className="order-summary-image"
//             src={tokenDetails.productImage}
//             alt={tokenDetails.productName}
//             key={tokenDetails.productId}
//           />
//           <div className="order-summary-middle-section">
//             <p className="order-summary-productName">{tokenDetails.productName}</p>
//             <p className="order-summary-productDescription">
//               {tokenDetails.productDescription}
//             </p>
//           </div>
//           <div className="order-summary-right-section">
//             <p className="order-summary-price">$ {tokenDetails.price}</p>
//             <p className="order-summary-qty">Qty: {tokenDetails.quantity}</p>
//           </div>
//         </div>
//       ))}
//       <div className="order-summary-totals">
//         <div className="order-subtotal-part">
//           <p>Subtotal</p>
//           <p className="order-subtotal-number">$397</p>
//         </div>
//         <div className="order-shipping-part">
//           <p>Shipping</p>
//           <p className="order-shipping-number">$0</p>
//         </div>
//         <div className="order-total-part">
//           <p>Total</p>
//           <p className="order-total-number">$379</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;
