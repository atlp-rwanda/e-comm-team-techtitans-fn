import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../Redux/Features/Wishlist/Wishlist";
import "../../scss/wish/wiahlist.scss";
import Footer from "../../components/Footer/Footer";
import Card from "../../pages/wishli/wishcard";
import Header from "../../components/Header/Header";
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
      <Header />
      <div>
        <h2>My Wishlist</h2>
        <div className="line">
          {isLoading ? (
            <p>Loading wishlist...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              <div className="week">
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <div id="wishlist-items" className="">
                      <Card
                        key={item.product_id}
                        product_id={item.product_id}
                        product_name={item.product_name}
                        product_image={item.product_image}
                        product_price={item.product_price}
                      />
                    </div>
                  ))
                ) : (
                  <p>Your wishlist is empty.</p>
                )}
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