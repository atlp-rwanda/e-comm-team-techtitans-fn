import React from "react";
import Card from "./Card";
import "./Product.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import CategoryIcon from "@mui/icons-material/Category";

const Product = () => {
  return (
    <div className="product-section">
      <h3>Product overview</h3>
      <div className="products">
        <CategoryIcon className="category-show-icon" />
        <ul className="category-links">
          <li>
            <a href="#" className="category-link">
              All Products
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Clothes
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Electronics
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Furniture
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Shoes
            </a>
          </li>
        </ul>
        <div className="icon-filter">
          <a className="btn-icon">
            <FilterListIcon /> Filter{" "}
          </a>
        </div>
      </div>
      <Card />
    </div>
  );
};
export default Product;
