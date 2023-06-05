import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import "./Product.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Card = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
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
            <div className="card-one">
              <Link to={`/buyer/product/${product.id}`} key={product.id}>
                <div>
                  <img src={product.images[0]} />
                </div>
              </Link>
              <div className="card-title">
                <div className="product-title">
                  <p>{product.name}</p>
                  <h5>${product.price}</h5>
                </div>

                <div className="icon">
                  <FavoriteBorderIcon />
                </div>
              </div>
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
