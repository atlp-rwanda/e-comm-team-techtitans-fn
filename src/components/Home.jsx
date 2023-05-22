import React from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "../variables/home.scss";
import Categories from "./Home/Categories";
import Product from "./Home/Product";
import Footer from "./Home/Footer";

function Home() {
  return (
    <div className="homeCont">
      <div className="upper-section">
        <h5>High Quality</h5>
        <h1 className="electronics">Electronics</h1>
        <button className="shop-now-btn">Shop now</button>
      </div>

      <Categories />
      <div className="middle-part">
        <h3 className="overview">PRODUCT OVERVIEW</h3>
        <ul className="ul">
          <li className="li-li">All Products</li>
          <li>Clothes</li>
          <li>Electronics</li>
          <li>Furniture</li>
          <li>Shoes</li>
        </ul>
      </div>

      <div>
        <Product />
      </div>

      <button className="load-more">Load More</button>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
