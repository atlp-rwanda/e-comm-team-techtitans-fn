import { useState, useEffect } from "react";
import "../../pages/Product/AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useParams } from "react-router-dom";
import {
  deleteProduct,
  getProductDetails,
} from "../../Redux/Features/Product/DeleteProductSlice";
import { ViewCategory } from "../../Redux/Features/Product/CategorySlice";
import { useNavigate } from "react-router-dom";

const DeleteProduct = () => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = params;

  const navigate = useNavigate();

  // Categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(ViewCategory());
        setCategoryIds(response.payload.data); // Assuming the response contains an array of category objects
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, [dispatch]);

  // Other product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await dispatch(getProductDetails({ id }));
      } catch (error) {
        return error;
      }
    };
    fetchProductDetails();
  }, [dispatch, id]);

  const previousPage = () => {
    navigate("/dashboard/productsList");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!id) {
      return;
    }
    const response = await dispatch(
      deleteProduct({
        id,
      })
    );
    message.success("Product Successfully deleted");
    navigate(`/dashboard/productsList`);
  };

  return (
    <div>
      <div style={{ marginTop: "80px" }}>
        <div className="row" style={{ marginLeft: "10%" }}>
          <form className="addProduct-form">
            <h2 className="addProduct-heading">Delete Product</h2>
            <div className="productName-d">
              <label className="" htmlFor="description">
                Reason:
              </label>
              <textarea
                className=""
                id="description"
                value={description}
                defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <button className="edit-btn-d" type="submit" onClick={handleSubmit}>
                Delete Product
              </button>
              <button className="back-btn-d" onClick={previousPage}>
                Back
              </button>
            </div>
            {status === "loading....." && (
              <div className="process">Loading...</div>
            )}
            {status === "failed" && <div className="error">{error}</div>}
            {status === "success" && (
              <div className="success">Product deleted successfully!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
