import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createWishlistItem,
  removeWishlistItem,
  toggleLogin,
} from "../../Redux/Features/Wishlist/Wishlist";
import "./button.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const WishlistButton = ({ product_id }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLoggedIn = useSelector((state) => state.wishlist.isLoggedIn);

  const handleAddToWishlist = () => {
    console.log("product_Id", product_id);
    if (!isLoggedIn) {
      toast.error("You must be logged in to add an item to the wishlist");
      return;
    }

    dispatch(createWishlistItem({ product_id }))
      .unwrap()
      .then(() => {
        toast.success("Added to Wishlist");
      })
      .catch((error) => {
        if (
          error.message ===
          "You must be logged in to add an item to the wishlist"
        ) {
          toast.error("You must be logged in to add an item to the wishlist");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleRemoveFromWishlist = () => {
    if (product_id) {
      dispatch(removeWishlistItem(product_id))
        .unwrap()
        .then((error) => {
          toast.error(error.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleToggleLogin = () => {
    if (!isLoggedIn) {
      dispatch(toggleLogin());
    }
  };

  const isItemInWishlist = wishlistItems.some(
    (item) => item.product_id === product_id
  );

  return (
    <div>
      <ToastContainer />
      <button
        onClick={
          isLoggedIn
            ? isItemInWishlist
              ? handleRemoveFromWishlist
              : handleAddToWishlist
            : handleToggleLogin
        }
      >
        {isItemInWishlist ? "Remove from Wishlist" : <FavoriteBorderIcon />}
      </button>
    </div>
  );
};

export default WishlistButton;
