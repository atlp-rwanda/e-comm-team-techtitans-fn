import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../Redux/Features/Dashboard/productsSlice";
import Productlists from "../../pages/Dashboard/ViewProduct";
import "./DashboardSellerProducts.scss";
import { Link } from "react-router-dom";

function SellerProduct() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
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
          <div className="add-product-button">
           <Link to="/addproduct"> <button className="button">Add product</button></Link>
          </div>
        </div>

        <div className="bottom-section">
        <div className="products-wrapper">
  {products.length > 0 ? (
    currentProducts.reverse().map((product) => (
      <Productlists product={product} key={product.id} />
    ))
  ) : (
    <div>Loading products...</div>
  )}
</div>

        </div>
        <div className="pagination-buttons">
          <button className="page-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            First
          </button>
          <button className="page-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={currentPage === pageNumber ? "active" : ""}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
          <button className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
          <button className="page-button"
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
