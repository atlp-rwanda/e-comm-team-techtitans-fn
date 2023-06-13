import "../../scss/wish/wishcard.scss";
import React from "react";

const Card = ({ product_name, product_image, product_price }) => {
  return (
    <div className="divcont">
      <div className="card">
        <img src={product_image[0]} alt={product_name} />
        <h3>{product_name}</h3>
        <p>Price: ${product_price}</p>
      </div>
    </div>
  );
};

export default Card;
