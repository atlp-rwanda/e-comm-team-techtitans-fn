import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductReviewAverage } from "../../Redux/Features/Review/GetAverageProductReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ReviewProduct.scss";

const StarRating = ({ rating }) => {
  const stars = [];

  // Create an array of stars based on the rating
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} className="star filled" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} className="star empty" />
      );
    }
  }

  return <div className="star-rating">{stars}</div>;
};

const ProductRating = ({ pid }) => {
  const dispatch = useDispatch();
  const reviewAverage = useSelector((state) => state.reviewaverage[pid]);

  useEffect(() => {
    dispatch(fetchProductReviewAverage({ pid }));
  }, [dispatch, pid]);

  if (!reviewAverage) {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StarRating rating={0} />
          <p style={{ marginLeft: "0.5rem" }}>&nbsp; {0}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <StarRating rating={reviewAverage} />
        <p style={{ marginLeft: "0.5rem" }}>&nbsp; {reviewAverage}</p>
      </div>
    </div>
  );
};

export default ProductRating;
