import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProductCart } from '../../Redux/Features/Cart/ViewCartSlice';
import '../../scss/Payment/OrderSummary.scss';

const OrderSummary = () => {
  const [isFromBuyNow, setIsFromBuyNow] = useState(false);
  const checkFromBuyNow = localStorage.getItem('fromBuyNow');
  const theOrderProducts = JSON.parse(localStorage.getItem('orderToken'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProductCart());
    if (checkFromBuyNow === 'true') {
      setIsFromBuyNow(true);
    }
  }, []);

  const mycart = useSelector((state) => state?.showcart?.showcart?.cart);
  const cartProducts = (mycart && mycart[0].products) || [];
  const showmycart = (mycart && mycart[0]) || [];

  const tokenDetails = jwt_decode(theOrderProducts);

  return (
    <div className="order-summary-container">
      <p className="order-summary-title">ORDER SUMMARY</p>
      {isFromBuyNow ? (
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
            </p>
          </div>
        </div>
      ) : (
        <>
          {cartProducts?.map((product) => (
            <div className="order-summary-details" key={product.id}>
              <img
                className="order-summary-image"
                src={product.images[0]}
                alt={product.name}
              />
              <div className="order-summary-middle-section">
                <p className="order-summary-productName">{product.name}</p>
              </div>
              <div className="order-summary-right-section">
                <p className="order-summary-price">$ {product.price}</p>
                <p className="order-summary-qty">Qty: {product.quantity}</p>
              </div>
            </div>
          ))}
        </>
      )}
      <div className="order-summary-totals">
        <div className="order-subtotal-part">
          <p>Subtotal</p>
          <p className="order-subtotal-number">${showmycart.total}</p>
        </div>
        <div className="order-shipping-part">
          <p>Shipping</p>
          <p className="order-shipping-number">$0</p>
        </div>
        <div className="order-total-part">
          <p>Total</p>
          <p className="order-total-number">${showmycart.total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
