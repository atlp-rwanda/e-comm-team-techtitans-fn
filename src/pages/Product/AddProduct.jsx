import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/Features/Product/AddProductSlice";
import { ViewCategory } from "../../Redux/Features/Product/CategorySlice";
import { CloudinaryContext, Image } from "cloudinary-react";
import Header from "../../components/Header/Header";
import "./AddProduct.scss";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [images, setImages] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.product);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSnackbar(true);
    if (!categoryId) {
      return;
    }
    const imageUrls = images.map(
      (image) =>
        `https://res.cloudinary.com/dgcmsqndb/image/upload/${image.name}`
    );
    dispatch(
      createProduct({
        name,
        price,
        quantity,
        categoryId,
        description,
        expiryDate,
        images: imageUrls,
      })
    )
      .then(() => {})
      .catch((error) => console.log("Product Create error:", error));
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gwkladqc");
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/dgcmsqndb/image/upload",
      true
    );
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.upload.addEventListener("progress", (event) => {
      const progress = Math.round((event.loaded / event.total) * 100);
      setUploadProgress(progress);
    });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setImages((prevImages) => [...prevImages, { name: data.public_id }]);
        } else {
          console.error("Error uploading image:", xhr.statusText);
        }
      }
    };
    xhr.send(formData);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(ViewCategory());
        setCategoryIds(response.payload.data); // Assuming the response contains an array of category objects
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  if (status === "loading.....") {
    return (
      <div className="process">
        Loading...
        <div className="process">
          Loading...
          <br />
          <div>
            <Backdrop
              sx={{
                color: "#7A89E9",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={() => {}}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>
      </div>
    );
  }
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };
  return (
    <div>
      <Header />
      <div className="">
        <div className="row">
          <form onSubmit={handleSubmit} className="addProduct-form">
            <h2 className="addProduct-heading">Add Product</h2>
            <div className="productName">
              <div className="ProductName productName-left">
                <label className="" htmlFor="name">
                  Add Image:
                </label>
                <div>
                  <input
                    className=""
                    type="file"
                    id="images"
                    onChange={handleImageUpload}
                  />
                  {/* Render uploaded images */}
                  <CloudinaryContext cloudName="dgcmsqndb">
                    {images.map((uploadedImage, index) => (
                      <div key={index} className="productImage">
                        <Image
                          cloudName="dgcmsqndb"
                          publicId={uploadedImage.name}
                          transformation={{
                            width: 100,
                            height: 50,
                            crop: "fill",
                          }}
                          secure="true"
                        />
                        {uploadedImage.name}
                      </div>
                    ))}
                  </CloudinaryContext>
                </div>
                {/* Display progress */}
                {uploadProgress > 0 && (
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-200">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-500 transition-all duration-500"
                      ></div>
                    </div>
                    <div className="text-center">{uploadProgress}%</div>
                  </div>
                )}
              </div>
              <div className="ProductName productName-right">
                <div className="">
                  <label className="" htmlFor="name">
                    Product Name:
                  </label>
                  <input
                    className=""
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="">
                  <label className="" htmlFor="price">
                    Price:
                  </label>
                  <input
                    className=""
                    type="number"
                    id="price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="">
                  <label className="" htmlFor="quantity">
                    Quantity:
                  </label>
                  <input
                    className=""
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
                <div className="">
                  <label className="" htmlFor="categoryId">
                    Category:
                  </label>
                  <select
                    className=""
                    id="categoryId"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    // onClick={handleViewCategory}
                  >
                    <option value="">Select a category</option>
                    {Array.isArray(categoryIds) && // this will Checks if categoryIds is an array
                      categoryIds.map(
                        (
                          category // Iteration over the category objects
                        ) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        )
                      )}
                  </select>
                </div>
                <div className="">
                  <label className="" htmlFor="expiryDate">
                    Expiry Date:
                  </label>
                  <input
                    className=""
                    type="date"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(event) => setExpiryDate(event.target.value)}
                  />
                </div>
                <div className="">
                  <label className="" htmlFor="description">
                    Description:
                  </label>
                  <textarea
                    className=""
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <button className="btn" type="submit">
                  Publish Product
                </button>
              </div>
            </div>
            {status === "failed" && (
              <div className="error">
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
            {status === "success" && (
              <div className="success">
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
                    Product created successfully!
                  </Alert>
                </Snackbar>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddProductForm;
