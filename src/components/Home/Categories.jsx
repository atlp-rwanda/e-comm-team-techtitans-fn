import React from "react";
import { categoryDetails } from "../../Data/dummy";
import "../../variables/variables.scss";
import "./Homepage.scss";

const Categories = () => {
  return (
    <div className="categories-cont">
      {categoryDetails.map((item) => (
        <div key={item.categoryName}>
          <div>
            <img
              className="category-images"
              src={item.categoryImage}
              alt={item.categoryName}
            />
            <div className="category-span">
              <span>{item.categoryName}</span>
            </div>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
