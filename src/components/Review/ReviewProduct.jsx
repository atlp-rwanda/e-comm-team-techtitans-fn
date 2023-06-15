import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReviewProduct } from "../../Redux/Features/Review/ProductReview.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ReviewProduct.scss";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const ReviewComponent = ({ pid }) => {
  const [ratings, setRatings] = useState(0);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.review);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = () => {
    dispatch(ReviewProduct({ pid, feedback, ratings }));
    setShowSnackbar(true);
  };

  return (
    <div className="review-component">
      <div className="rating-container">
        <label className="rating-label">Rating:</label>
        <div className="stars-container">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setRatings(index + 1)}
              className={`rating-star ${ratings >= index + 1 ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faStar} />
            </button>
          ))}
        </div>
      </div>

      <label className="feedback-label">Feedback:</label>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="feedback-input"
      ></textarea>
      <br></br>
      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="submiti-button"
      >
        Submit Review
      </button>
      {status === "loading" && <div className="signup-right">Loading...</div>}
      {status === "failed" && (
        <div className="signup-right">
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%", fontSize: "1.5rem" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </div>
      )}
      {status === "succeeded" && (
        <div className="signup-right">
          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%", fontSize: "1.5rem" }}
            >
              Your Review has been submitted successfully!
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
