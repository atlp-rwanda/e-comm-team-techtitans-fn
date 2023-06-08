import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../Redux/Features/Dashboard/singleProductSlice";
import "../../styles/BuyerProduct.scss";

import ReviewComponent from "../../components/Review/ReviewProduct.jsx";
import { Recommend } from "../Product/Recommended.jsx";

export function BuyerSingleProductView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, status, error } = useSelector(
    (state) => state.singleProduct
  );
  const [currentImage, setCurrentImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct.data) {
      setCurrentImage(singleProduct.data.images[0]);
    }
  }, [singleProduct]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  if (!singleProduct.data) {
    return error;
  }

  const {
    name,
    stock,
    price,
    quantity,
    description,
    images,
    bonus,
    expiryDate,
    ec,
    createdAt,
    updatedAt,
    categoryId,
    vendorId,
  } = singleProduct.data;

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  };

  return (
    <>
      <div className="buyer-product-wrapper">
        <div className="left-side-1">
          <div
            className={`main-image-1 ${isHovered ? "zoomed" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={currentImage} alt="" />
          </div>
          <div className="image-wrapper-1">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="right-side-1">
          <div className={`enlarged-image-1 ${isHovered ? "visible" : ""}`}>
            <img src={currentImage} alt="" />
          </div>
          <h2>{name}</h2>
          <h3>${price}</h3>
          <p>{description}</p>
          <div className="buyer-choice-1">
            <div className="color-picker-1">
              <label>Color</label>
              <input type="color" />
            </div>
            <div className="size-dropdown-1">
              <label>Size</label>
              <select>
                <option value="small">S</option>
                <option value="medium">M</option>
                <option value="large">L</option>
                <option value="large">XL</option>
              </select>
            </div>
            <div className="quantity-dial-1">
              <label>Quantity</label>
              <input type="number" min="1" defaultValue="1" />
            </div>
          </div>
          <ReviewComponent pid={id} />
        </div>
      </div>
      <Recommend />
    </>
  );
}
