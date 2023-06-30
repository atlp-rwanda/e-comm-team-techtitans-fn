import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './cartview.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewProductCart,
  incrementItem,
} from '../../Redux/Features/Cart/ViewCartSlice';
import { useEffect } from 'react';
import EmptyCart from './EmptyCart';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import boximportant from '../../assets/images/boximportant.svg';
import { ClearCart } from '../../Redux/Features/Cart/ClearCartSlice';
import decodeToken from '../../utils/decodeToken';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/apiUtilis';
import { createOrderFromCart } from '../../Redux/Features/Order/getOrder.slice';

const CartView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { showcart, statuss } = useSelector((state) => state.showcart);
  const mycart = useSelector((state) => state.showcart?.showcart?.cart);
  // console.log('myCarrrrtttt', mycart[0].id);

  const { status } = useSelector((state) => state.clearcart);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProductCart());
  }, [dispatch]);

  const showmycart = mycart && mycart[0].products;

  const handleIncrement = (itemId) => {
    console.log(itemId);
  };

  const handleDecrement = (itemId) => {
    console.log(itemId);
  };

  const handleClearCart = () => {
    const id = decodeToken().id;
    dispatch(ClearCart(id));
    setShowSnackbar(true);

    setTimeout(() => {
      navigate('/emptycart');
    }, 3000);
  };

  const handleCheckoutRedirect = () => {
    const cartId = mycart && mycart[0].id;
    dispatch(createOrderFromCart({ cartId }));
    localStorage.setItem('fromBuyNow', 'false');
    navigate('/checkout');
  };

  return (
    <>
      <div className="cartContainer">
        <div className="carttitle">
          <div>
            <p className="carttitledetails">Product</p>
          </div>

          {statuss === 'loading' ? (
            <div>Loading...</div>
          ) : (
            <>
              {showmycart?.length > 0
                ? showmycart.map((product) => (
                    <div className="cartproductdetails" key={product.id}>
                      <div>
                        <img className="designimage" src={product.images[0]} />
                      </div>

                      <h2 className="producttitledetails">{product.name}</h2>
                      <h2 className="producttitledetails">
                        {' '}
                        $ {product.price}
                      </h2>

                      <div className="counter">
                        <div
                          className="btn"
                          onClick={() => handleIncrement(product.id)}
                        >
                          +
                        </div>
                        <div className="count">{product.quantity}</div>
                        <div
                          className="btn"
                          onClick={() => handleDecrement(product.id)}
                        >
                          -
                        </div>
                      </div>

                      <div className="prices">
                        <div className="amount">$ {product.total}</div>
                      </div>
                    </div>
                  ))
                : navigate('/emptycart')}
            </>
          )}

          <div className="btndetails">
            <button className="clearcartbtn" onClick={handleOpen}>
              CLEAR CART
            </button>
            <Link to="/orders">
              <button className="clearcartbtn">VIEW ORDERS DETAILS</button>
            </Link>
          </div>
        </div>

        <div className="totalcontainer">
          <p className="totaltitle">CART TOTALS</p>
          <div className="totaldetails">
            <p>
              Total :{' '}
              <strong className="alignleft">
                $ {mycart && mycart[0].total}
              </strong>
            </p>
          </div>

          <button className="btncheckout" onClick={handleCheckoutRedirect}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="showmodel">
          <img className="boximportantdesign" src={boximportant} />
          <p>Are you Sure?</p>
          <p className="textpara">
            Do you Want to remove everything from cart?
          </p>
          <div className="buttondetails">
            <button className="btncancel" onClick={handleClose}>
              No,Cancel
            </button>
            <button
              className="btnremove"
              type="submit"
              onClick={handleClearCart}
              disabled={status === 'loading'}
            >
              Yes,Remove
            </button>
          </div>
        </div>
      </Modal>
      {status === 'loading' && <div className="signup-right">Loading...</div>}
      {status === 'failed' && (
        <div className="signup-right">
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: '100%', fontSize: '1.5rem' }}
            >
              Something went Wrong! Please try again later.
            </Alert>
          </Snackbar>
        </div>
      )}
      {status === 'succeeded' && (
        <div className="signup-right">
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: '100%', fontSize: '1.5rem' }}
            >
              Cart Cleared successfully!
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default CartView;
