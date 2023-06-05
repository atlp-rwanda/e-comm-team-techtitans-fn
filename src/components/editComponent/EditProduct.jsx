import { useState, useEffect } from 'react';
import '../../pages/Product/AddProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import {
  editProduct,
  getProductDetails,
} from '../../Redux/Features/Product/EditProductSlice';
import { ViewCategory } from '../../Redux/Features/Product/CategorySlice';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [images, setImages] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
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

        // set the expiry date format accordingly
        const formattedExpiryDate = response.payload.data.expiryDate.substring(
          0,
          10,
        );

        // set everything else to match the fetched product's details
        setName(response.payload.data.name);
        setPrice(response.payload.data.price);
        setQuantity(response.payload.data.quantity);
        setCategoryId(response.payload.data.categoryId);
        setDescription(response.payload.data.description);
        setExpiryDate(formattedExpiryDate);
        setImages(response.payload.data.images);
      } catch (error) {
        return error;
      }
    };
    fetchProductDetails();
  }, [dispatch, id]);

  const previousPage = () => {
    navigate('/dashboard/productsList');
  };

  const imageUrls = images.map((image) => image);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!categoryId) {
      return;
    }
    const response = await dispatch(
      editProduct({
        id,
        name,
        price,
        quantity,
        categoryId,
        description,
        expiryDate,
        images: imageUrls,
      }),
    );
    message.success('Product Successfully updated');
    navigate(`/dashboard/productsList`);
  };

  return (
    <div>
      <div style={{ marginTop: '80px' }}>
        <div className="row" style={{ marginLeft: '10%' }}>
          <form className="addProduct-form">
            <h2 className="addProduct-heading">Edit Product</h2>
            <div className="productName">
              <div className="ProductName productName-left">
                <label htmlFor="name">
                  {/* Edit Images: */}
                  Images:
                </label>
                <div>
                  {/* Render uploaded images */}
                  <CloudinaryContext cloudName="dgcmsqndb">
                    {imageUrls.map((uploadedImage, index) => (
                      <div key={index} className="productImage">
                        <Image
                          width="100px"
                          height="100px"
                          cloudName="dgcmsqndb"
                          publicId={uploadedImage}
                          transformation={{
                            width: 100,
                            height: 50,
                            crop: 'fill',
                          }}
                          secure="true"
                        />
                        {/* Image Title */}
                        {uploadedImage.split(
                          'https://res.cloudinary.com/dgcmsqndb/image/upload/titans/',
                        )}
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
                    defaultValue={name}
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
                    defaultValue={price}
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
                    defaultValue={quantity}
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
                    defaultValue={categoryId}
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
                    defaultValue={expiryDate}
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
                    defaultValue={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div>
                  <button
                    className="edit-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Edit Product
                  </button>
                  <button className="back-btn" onClick={previousPage}>
                    Back
                  </button>
                </div>
              </div>
            </div>
            {status === 'loading.....' && (
              <div className="process">Loading...</div>
            )}
            {status === 'failed' && <div className="error">{error}</div>}
            {status === 'success' && (
              <div className="success">Product updated successfully!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
