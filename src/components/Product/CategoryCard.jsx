import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleCategory } from "../../Redux/Features/Product/getCategorySlice";
import "./Product.scss";
import ProductRating from "../Review/GetProductReviewAverage.jsx";
import WishlistButton from "../../components/wishlist-btn/wishlistbutton";
import { useParams } from "react-router-dom";

const CategoryCard = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  console.log("name", name);
  const { singleCategory, status, error } = useSelector(
    (state) => state.singleCategory
  );
  useEffect(() => {
    dispatch(getSingleCategory({ name }));
  }, [dispatch, name]);
  const categoryProducts = singleCategory?.data?.products;
  console.log("singleCategory product **********", categoryProducts);

  return (
    <>
      <div className="card-container">
        {categoryProducts?.length > 0 ? (
          categoryProducts.map((product) => (
            <div className="card-one" key={product?.name}>
              <Link to={`/buyer/product/${product?.name}`}>
                <div className="cardz">
                  <img src={product?.images[0]} alt={product?.name} />
                  <div className="card-hover">
                    <div className="card-hover--content">
                      <p className="only">Only </p>
                      <h5 className="only-price">${product?.price}</h5>
                      <div className="quickly">
                        <a href="" className="only-btn">
                          Quick Review
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="card-title">
                <div className="product-title">
                  <p>{product.name}</p>{" "}
                  {/* Truncate product name to 20 characters */}
                  <h5>${product?.price}</h5>
                </div>
                <div className="icon">
                  <WishlistButton product_id={product?.name} />
                </div>
              </div>
              <ProductRating pid={product?.name} />
            </div>
          ))
        ) : (
          <div>Loading singleCategory...</div>
        )}
      </div>
    </>
  );
};

export default CategoryCard;
