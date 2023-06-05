import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import "./Product.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WishlistButton from "../../components/wishlist-btn/wishlistbutton";

const Card = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card-one" key={product.id}>
              <img src={product.images[0]} alt={product.name} />
              <div className="card-title">
                <div className="product-title">
                  <p>{product.name}</p>
                  <h5>${product.price}</h5>
                </div>

                <div className="icon">
                  <FavoriteBorderIcon />
                  <WishlistButton product_id={product.id} />
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

// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
// import "./Product.scss";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import WishlistButton from "../../components/wishlist-btn/wishlistbutton";

// const Card = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.products);
//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);
//   return (
//     <>
//       <div className="card-container">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div className="card-one">
//               <img src={product.images[0]} />
//               <div className="card-title">
//                 <div className="product-title">
//                   <p>{product.name}</p>
//                   <h5>${product.price}</h5>
//                 </div>

//                 <div className="icon">
//                   <FavoriteBorderIcon />
//                   <WishlistButton product_Id ={products.id}/>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>Loading products...</div>
//         )}
//       </div>
//     </>
//   );
// };
// export default Card;
