import { useEffect, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = showreview.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Reviews</h2>
        <p>Based on {showreview.length} reviews</p>
      </div>
      {currentItems.map((review) => (
        <div key={review.id} className="review-item">
          <p className="review-feedback">{review.feedback}</p>
          <StarRating rating={review.ratings} />
        </div>
      ))}
      {/* Pagination */}
      <div className="pagination">
        {Array.from({
          length: Math.ceil(showreview.length / itemsPerPage),
        }).map((item, index) => (
          <button
            key={index}
            className={`pagination-number ${
              index + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
