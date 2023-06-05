// WishlistButton.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createWishlistItem,
  removeWishlistItem,
  toggleLogin,
} from "../../Redux/Features/Wishlist/WishlistSlice";

const WishlistButton = ({ product_id }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLoggedIn = useSelector((state) => state.wishlist.isLoggedIn);

  const handleAddToWishlist = () => {
    console.log("product_Id", product_id);
    // if (isLoggedIn) {
    // if (product_id) {
    dispatch(createWishlistItem({ product_id }))
      .unwrap()
      .then(() => {
        toast.success("Added to Wishlist");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // }
    // } else {
    //   toast.error("You must be logged in to add an item to the Wishlist");
    // }
  };

  const handleRemoveFromWishlist = () => {
    if (product_id) {
      dispatch(removeWishlistItem(product_id))
        .unwrap()
        .then(() => {
          toast.error("Removed from Wishlist");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleToggleLogin = () => {
    dispatch(toggleLogin());
    toast.info("Please log in to add an item to the Wishlist");
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
        {isItemInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default WishlistButton;

// import React from "react";
// import PropTypes from "prop-types";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { toggleLogin } from "../../Redux/Features/Wishlist/WishlistSlice";
// import {
//   createWishlistItem,
//   removeWishlistItem,
// } from "../../Redux/Features/Wishlist/WishlistSlice";

// const WishlistButton = ({ product }) => {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector((state) => state.wishlist.items);
//   const isLoggedIn = useSelector((state) => state.wishlist.isLoggedIn);

//   const handleAddToWishlist = () => {
//     if (!isLoggedIn) {
//       toast.error("You must be logged in to add an item to the Wishlist");
//       return;
//     }
//      const product =product.id;
//     if (product && product.id) {
//       dispatch(createWishlistItem({product}));
//       toast.success("Added to Wishlist");
//     }
//   };

//   const handleRemoveFromWishlist = () => {
//     if (product && product.id) {
//       dispatch(removeWishlistItem(product.id));
//       toast.error("Removed from Wishlist");
//     }
//   };

//   const handleToggleLogin = () => {
//     dispatch(toggleLogin());
//     toast.info("Please log in to add an item to the Wishlist");
//   };

//   const isItemInWishlist = wishlistItems.some(
//     (item) => item.productId === product?.id
//   );

//   return (
//     <div>
//       <ToastContainer />
//       <button
//         onClick={
//           isLoggedIn
//             ? isItemInWishlist
//               ? handleRemoveFromWishlist
//               : handleAddToWishlist
//             : handleToggleLogin
//         }
//       >
//         {isItemInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//       </button>
//     </div>
//   );
// };

// WishlistButton.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.number.isRequired
//     // Add other required props for the product object if necessary
//   }).isRequired,
// };

// export default WishlistButton;
