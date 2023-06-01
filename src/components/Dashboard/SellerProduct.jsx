import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import Productlists from "../../pages/Dashboard/ViewProduct";

function SellerProduct() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="content">
        <div className="content-header">
          <div className="titles">
            <h2>Products</h2>
          </div>
        </div>
        <div className="productImages">
          <div className="image-wrapper">
            {currentProducts.map((product) => (
              <img key={product.id} src={product.images[0]} alt={product.name} />
            ))}
          </div>
        </div>
        <div className="texts">
          <p>New Trends</p>
        </div>
        <div className="bottom-section">
          <div className="categories-texts">
            <h5>Best Sales</h5>
            <p>Men</p>
            <p>Women</p>
          </div>
          <div className="products-wrapper">
            {products.length > 0 ? (
              currentProducts.map((product) => (
                <Productlists product={product} key={product.id} />
              ))
            ) : (
              <div>Loading products...</div>
            )}
          </div>
        </div>
        <div className="pagination-buttons">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={currentPage === pageNumber ? "active" : ""}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
}

export default SellerProduct;
