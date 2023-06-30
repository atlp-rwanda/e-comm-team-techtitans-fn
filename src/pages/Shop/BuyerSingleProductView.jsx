import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getSingleProduct } from '../../Redux/Features/Dashboard/singleProductSlice';
import '../../styles/BuyerProduct.scss';

import ReviewComponent from '../../components/Review/ReviewProduct.jsx';
import { Recommend } from '../Product/Recommended.jsx';
import ProductReviews from '../../components/Review/GetProductReviews.jsx';
import { AddToCartProduct } from '../../Redux/Features/Cart/CartSlice';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { buyNowThunk } from '../../Redux/Features/Payment/paymentSlice';

import Skeleton from './Skeleton';

export function BuyerSingleProductView() {
  const { id } = useParams();
  const [quantitys, setQuantitys] = useState();
  const dispatch = useDispatch();
  const { statuss } = useSelector((state) => state.cart);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = () => {
    dispatch(AddToCartProduct({ productId: id, productQuantity: quantitys }));
    setShowSnackbar(true);
  };

  const { singleProduct, status, error } = useSelector(
    (state) => state.singleProduct,
  );
  const [currentImage, setCurrentImage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(getSingleProduct(id)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct.data) {
      setCurrentImage(singleProduct.data.images[0]);
    }
  }, [singleProduct]);

  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error: {error}</div>;
  }

  if (!singleProduct.data) {
    return error;
  }

  const {
    name,
    stock,
    price,
    quantity,
    description,
    images,
    bonus,
    expiryDate,
    ec,
    createdAt,
    updatedAt,
    categoryId,
    vendorId,
  } = singleProduct.data;

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const userRole = localStorage.getItem('role');

  // .Buy Now. 👇🏽
  const handleBuyNow = async () => {
    try {
      setIsBuyNowLoading(true);

      const response = await dispatch(
        buyNowThunk({ productId: id, quantity: quantitys }),
      );

      if (response.error) {
        toast.error('This product is already among your current orders');
        setIsBuyNowLoading(false);
      } else {
        localStorage.setItem(
          'buyNowToken',
          JSON.stringify(response?.payload?.token),
        );

        localStorage.setItem('fromBuyNow', 'true');

        navigate('/checkout');

        setIsBuyNowLoading(false);
      }
    } catch (error) {
      return error;
    }
  };
  // .Buy Now. 👆🏽

  return (
    <>
      <div className="buyer-product-wrapper">
        <div className="left-side-1">
          <div
            className={`main-image-1 ${isHovered ? 'zoomed' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={currentImage} alt="" />
          </div>
          <div className="image-wrapper-1">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="right-side-1">
          <div className={`enlarged-image-1 ${isHovered ? 'visible' : ''}`}>
            <img src={currentImage} alt="" />
          </div>
          <div className="right-side-1-h2">{name}</div>
          <div className="right-side-1-h3">${price}</div>
          <div className="right-side-1-p">{description}</div>
          <div className="buyer-choice-1">
            <div className="color-picker-1">
              <label>Color</label>
              <input type="color" />
            </div>
            <div className="size-dropdown-1">
              <label>Size</label>
              <select>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
                <option value="large">XL</option>
              </select>
            </div>
            <div className="quantity-dial-1">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                defaultValue="1"
                value={quantitys}
                onChange={(e) => setQuantitys(e.target.value)}
              />
            </div>
            <input
              type="submit"
              onClick={handleSubmit}
              disabled={statuss === 'loading'}
              // value="Add to Cart"
              value={statuss === 'loading' ? 'Loading...' : 'Add To Cart'}
              className="addcartbtn"
            />
            {isBuyNowLoading ? (
              <input
                type="submit"
                onClick={handleBuyNow}
                // disabled={statuss === 'loading'}
                value="Loading..."
                className="buyNowBtn"
              />
            ) : (
              <input
                type="submit"
                onClick={handleBuyNow}
                // disabled={statuss === 'loading'}
                value="Buy Now"
                className="buyNowBtn"
              />
            )}

            {/* {statuss === "loading" && (
              <div className="signup-right">Loading...</div>
            )} */}
            {statuss === 'failed' && (
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
            {statuss === 'succeeded' && (
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
                    Product Added to Cart successfully!
                  </Alert>
                </Snackbar>
              </div>
            )}
          </div>

          {userRole && userRole !== '2' && userRole !== '1' && (
            <ReviewComponent pid={id} />
          )}

          <ProductReviews pid={id} />
        </div>
      </div>
      <Recommend />
    </>
  );
}
