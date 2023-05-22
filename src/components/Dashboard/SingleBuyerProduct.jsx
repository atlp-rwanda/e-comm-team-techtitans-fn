import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../Redux/Features/Dashboard/singleProductSlice";
import "../../styles/SellerProduct.scss";

export function SingleBuyerProduct() {
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
    <div className="content">
      <div className="content-header">
        <div className="titles">
          <h5>Products / {name}</h5>
        </div>

        <div className="product-wrapper">
          <div className="left-side">
            <div
              className={`main-image ${isHovered ? "zoomed" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={currentImage} alt="" />
            </div>
            <div className="image-wrapper">
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
          <div className="right-side">
            <div className={`enlarged-image ${isHovered ? "visible" : ""}`}>
              <img src={currentImage} alt="" />
            </div>
            <h2>{name}</h2>
            <h3>${price}</h3>
            <p>{description}</p>
            <div className="buyer-choice">
              <div className="quantity">
                <label>Quantity</label>
                <p>{quantity}</p>
              </div>
              <div className="createdAt">
                <label>Created at</label>
                <p>{formatDate(createdAt)}</p>
              </div>
              <div className="stock">
                <label>Stock status</label>
                <p>{stock}</p>
              </div>
              <div className="expiryDate">
                <label>Expiry date</label>
                <p>{formatDate(expiryDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
