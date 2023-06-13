import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import "./Product.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ProductRating from "../Review/GetProductReviewAverage.jsx";

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
          onClick={() => {}}
        >
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
                <div>
                  <img src={product.images[0]} alt={product.name} />
                </div>
              </Link>
              <div className="card-title">
                <div className="product-title">
                  <p>{truncateName(product.name, 20)}</p>{" "}
                  {/* Truncate product name to 20 characters */}
                  <h5>${product.price}</h5>
                </div>

                <div className="icon">
                  <FavoriteBorderIcon />
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
