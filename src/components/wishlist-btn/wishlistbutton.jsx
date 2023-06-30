import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  createWishlistItem,
  removeWishlistItem,
  toggleLogin,
} from "../../Redux/Features/Wishlist/Wishlist";
import "./button.scss";

const WishlistButton = ({ product_id }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLoggedIn = useSelector((state) => state.wishlist.isLoggedIn);

  const handleAddToWishlist = () => {
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
        toast.error(error.message);
      });
  };

  const handleRemoveFromWishlist = () => {
    if (product_id) {
      dispatch(removeWishlistItem(product_id))
        .unwrap()
        .then(() => {
          toast.success("Removed from Wishlist");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleToggleLogin = () => {
    dispatch(toggleLogin());
  };

  const isItemInWishlist =
    product_id && wishlistItems.some((item) => item.product_id === product_id);

  return (
    <div>
      <ToastContainer />
      <IconButton
        onClick={
          isLoggedIn
            ? isItemInWishlist
              ? handleRemoveFromWishlist
              : handleAddToWishlist
            : handleToggleLogin
        }
      >
        {isItemInWishlist ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </div>
  );
};

export default WishlistButton;

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   createWishlistItem,
//   removeWishlistItem,
//   toggleLogin,
// } from "../../Redux/Features/Wishlist/Wishlist";
// import "./button.scss";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// const WishlistButton = ({ product_id }) => {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector((state) => state.wishlist.items);
//   const isLoggedIn = useSelector((state) => state.wishlist.isLoggedIn);

//   const handleAddToWishlist = () => {
//     if (!isLoggedIn) {
//       toast.error("You must be logged in to add an item to the wishlist");
//       return;
//     }

//     dispatch(createWishlistItem({ product_id }))
//       .unwrap()
//       .then(() => {
//         toast.success("Added to Wishlist");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   const handleRemoveFromWishlist = () => {
//     if (product_id) {
//       dispatch(removeWishlistItem(product_id))
//         .unwrap()
//         .then(() => {
//           toast.success("Removed from Wishlist");
//         })
//         .catch((error) => {
//           toast.error(error.message);
//         });
//     }
//   };

//   const handleToggleLogin = () => {
//     dispatch(toggleLogin());
//   };

//   const isItemInWishlist =
//     product_id && wishlistItems.some((item) => item.product_id === product_id);

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
//         {isItemInWishlist ? "Remove from Wishlist" : <FavoriteBorderIcon />}
//       </button>
//     </div>
//   );
// };

// export default WishlistButton;
