import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import "/Users/virgile/e-comm-team-techtitans-fn/src/components/wishlist-btn/ wishcard.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Card = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="card-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card-one" key={product.id}>
              <img src={product.images[0]} alt={product.name} />
              <div className="card-title">
                <div className="product-title">
                  <p>{product.name}</p>
                  <h5>${product.price}</h5>
                </div>
                <div className="icon">
                  <FavoriteBorderIcon />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading products...</div>
        )}
      </div>
    </>
  );
};

export default Card;
