import React, { useEffect } from "react";
import Card from "./CategoryCard";
import "./Product.scss";
import CategoryIcon from "@mui/icons-material/Category";
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { ViewCategory } from "../../Redux/Features/Product/CategorySlice.js";

const Product = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(ViewCategory());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const productCategories = product?.data?.categories || [];

  return (
    <div className="product-section" id={theme}>
      <h3>Product overview</h3>
      <div className="products">
        <CategoryIcon className="category-show-icon" />
        <ul className="category-links">
          <li>
            <Link to="/" className="category-link">
              All Products
            </Link>
          </li>
          {productCategories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/filter/category/${category?.name}`}
                className="category-link">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Card />
    </div>
  );
};

export default Product;
