import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Features/Product/GetProducts.slice";
import "./Homepage.scss";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import Productlists from "../../pages/Dashboard/ViewProduct";
import SellerProduct from "../../components/Dashboard/SellerProduct";
import BuyerProduct from "../Dashboard/BuyeProduct";

const Product = () => {
  // const dispatch = useDispatch();
  // const Allproducts = useSelector((state) => state.Products);

  // // useEffect(() => {
  // //   dispatch(getProducts());
  // // }, [dispatch]);

  // console.log("all products", Allproducts);

  return (
    <div className="Main">
      <div>
        <BuyerProduct />
      </div>

      {/* {Allproducts && Allproducts.data.map((item) => (
          <div key={item.name}>
            <div className="Images">
              <img src={item.images[0]} alt={item.name} />
            </div>
            <div className="Span">
              <span>{item.name}</span> <br />
              <span>{item.price}</span>
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default Product;
