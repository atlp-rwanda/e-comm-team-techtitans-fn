import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import "./Product.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ProductRating from "../Review/GetProductReviewAverage.jsx";
import WishlistButton from "../../components/wishlist-btn/wishlistbutton";

const Card = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Function to truncate the product name if it exceeds a certain length
  const truncateName = (name, maxLength) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  if (isLoading === true || products === null) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#7A89E9", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => {}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  return (
    <>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card-one" key={product.id}>
              <Link to={`/buyer/product/${product.id}`}>
                <div className="cardz">
                  <img src={product.images[0]} alt={product.name} />
                  <div className="card-hover">
                    <div className="card-hover--content">
                      <p className="only">Only </p>
                      <h5 className="only-price">${product.price}</h5>
                      <div className="quickly">
                        <a href="" className="only-btn">
                          Quick Review
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="card-title">
                <div className="product-title">
                  <p>{truncateName(product.name, 20)}</p>{" "}
                  {/* Truncate product name to 20 characters */}
                  <h5>${product.price}</h5>
                </div>
                <div className="icon">
                  <WishlistButton product_id={product.id} />
                </div>
              </div>
              <ProductRating pid={product.id} />
            </div>
          ))
        ) : (
          <div>Loading products...</div>
        )}
      </div>
    </>
  );
};

export default Card;
