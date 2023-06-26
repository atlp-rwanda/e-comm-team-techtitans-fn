import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Redux/Features/Product/AddProductSlice";
import { ViewCategory } from "../../Redux/Features/Product/CategorySlice";
import { CloudinaryContext, Image } from "cloudinary-react";
import "./AddProduct.scss";
import { useNavigate } from "react-router-dom";
import { ThreeDots,TailSpin } from "react-loader-spinner";

function AddProductForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [images, setImages] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error messages
    setNameError("");
    setPriceError("");
    setDescriptionError("");
    setExpiryDateError("");

    // Validation
    let isValid = true;
    if (name.trim() === "") {
      setNameError("Name is required to create a product");
      isValid = false;
    }
    if (price <= 0) {
      setPriceError("Price must be greater than 0");
      isValid = false;
    }
    if (description.trim() === "") {
      setDescriptionError("Description is required");
      isValid = false;
    }
    if (expiryDate === "") {
      setExpiryDateError("Expiry date is required");
      isValid = false;
    }

    if (!categoryId) {
      return;
    }

    if (isValid) {
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
    }
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
  if (status === "success") {
    navigate("/dashboard/productsList");
  }
  return (
    <div>
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
                  {nameError && <div className="error">{nameError}</div>}
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
                  {priceError && <div className="error">{priceError}</div>}
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
                  >
                    <option value="">Select a category</option>
                    {Array.isArray(categoryIds) &&
                      categoryIds.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
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
                  {expiryDateError && (
                    <div className="error">{expiryDateError}</div>
                  )}
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
                  {descriptionError && (
                    <div className="error">{descriptionError}</div>
                  )}
                </div>
               
                <button className="btn" type="submit">
                   {status === 'loading.....' ?  
                  <TailSpin
                  height="25"
                  width="25"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                   : 'Save'}
                </button>
              </div>
            </div>
            {status === "failed" && <div className="error">{error}</div>}
            {status === "success" && (
              <div className="success">Product created successfully!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;