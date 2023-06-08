import React from "react";
import { Link } from "react-router-dom";
import "../../components/Product/Product.scss";

const RecommendViewProduct = ({ product }) => {
  return (
    <div className="card-one-rec">
      <h2 className="card-title-rec">{product.title}</h2>
      <div className="">
        <Link to={`/buyer/products/${product.id}`} key={product.id}>
          <img src={product.images[0]} alt="product" className="" />
        </Link>
      </div>
      <div className="product-title-rec">${product.price}</div>
    </div>
  );
};

export default RecommendViewProduct;
