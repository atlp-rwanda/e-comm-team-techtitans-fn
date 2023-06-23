import React from "react";
import "../../scss/wish/wishcard.scss";
import { useDispatch } from "react-redux";
import { removeWishlistItem } from "../../Redux/Features/Wishlist/Wishlist";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Card = ({ product_id, product_name, product_image, product_price }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeWishlistItem(product_id));
  };

  return (
    <div className="divcont">
      <div className="card">
        <img src={product_image[0]} alt={product_name} />
        <h3>{product_name}</h3>
        <p>Price: ${product_price}</p>
        <button onClick={handleRemoveItem}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};

export default Card;
