import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createWishlistItem } from "../../Redux/Features/Wishlist/WishlistSlice";
import AddToWishlistButton from "../../components/wishlist-btn/wishlistbutton";
const ProductPage = ({ productId }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const createWishlistItem = () => {
    if (token) {
      dispatch(createWishlistItem(productId))
        .unwrap()
        .then(() => {
          setShowConfirmation(true);
        })
        .catch((error) => {
          console.log("Error adding item to wishlist:", error);
        });
    } else {
      // Handle case when user is not authenticated
    }
  };

  return (
    <div>
      <h1>Product Page</h1>
      <AddToWishlistButton product={productId} />
      {showConfirmation && <p>Item added to wishlist.</p>}
    </div>
  );
};

export default ProductPage;
