import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../Redux/Features/Wishlist/WishlistSlice";
import "../../scss/wish/wislist.scss";
import Footer from "../../components/Footer/Footer";
import Card from "../../pages/wishli/wishcard";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isLoading = useSelector((state) => state.wishlist.isLoading);
  const error = useSelector((state) => state.wishlist.error);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <>
      <div>
        <h2>My Wishlist</h2>
        <div className="line">
          {isLoading ? (
            <p>Loading wishlist...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              <div className="">
                <div id="wishlist-items" className="">
                  {wishlist.length > 0 ? (
                    wishlist.map((item) => (
                      <Card
                        key={item.id}
                        image={item.product_image}
                        name={item.product_name}
                        description={item.product_price}
                      />
                    ))
                  ) : (
                    <p>Your wishlist is empty.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
