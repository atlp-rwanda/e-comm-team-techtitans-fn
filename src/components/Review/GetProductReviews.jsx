import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetReviewsProduct } from "../../Redux/Features/Review/GetProductReview";
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
const ProductReviews = ({ pid }) => {
  const dispatch = useDispatch();
  const { showreview, error, status } = useSelector(
    (state) => state.showreview
  );

  useEffect(() => {
    dispatch(GetReviewsProduct({ pid }));
  }, [dispatch, pid]);

  if (status === "loading") {
    return <div>Loading reviews...</div>;
  }

  if (status === "failed") {
    return (
      <div>
        <h2>No Review Yet</h2>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Reviews</h2>
        <p>Based on {showreview.length} reviews</p>
      </div>
      {showreview.map((review) => (
        <div key={review.id} className="review-item">
          <p className="review-feedback">{review.feedback}</p>
          <StarRating rating={review.ratings} />
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
