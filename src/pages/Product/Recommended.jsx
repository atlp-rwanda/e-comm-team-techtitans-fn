import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecommendedProduct } from "../../Redux/Features/Product/RecommendedSlice";
import RecommendedCard from "./RecommendCard";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "../../components/Product/Product.scss";

export function Recommend() {
  const dispatch = useDispatch();
  const { recommended, status, error } = useSelector(
    (state) => state.recommended
  );
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(true); // Set the initial state of 'open' to true

  useEffect(() => {
    dispatch(RecommendedProduct())
      .then((response) => {
        console.log("recommended products:", response.payload);
      })
      .catch((error) => console.log("RecommendedProduct error:", error));
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (status === "loading....." || recommended === null) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#7A89E9", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  const totalItems = recommended.products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const paginatedProducts = recommended.products.slice(startIdx, endIdx);

  const getRandomProducts = () => {
    const randomizedProducts = recommended.products.slice(); // Create a copy of the original array

    for (let i = randomizedProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index

      // Swap elements at positions i and j
      [randomizedProducts[i], randomizedProducts[j]] = [
        randomizedProducts[j],
        randomizedProducts[i],
      ];
    }

    return randomizedProducts;
  };

  const randomizedProducts = getRandomProducts();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="recommended-container">
        <div className="recommended">
          {status === "loading......." && <div className=""></div>}
          {status === "failed" && <div className="">{error}</div>}
        </div>
        <h1 className="rec-header">Recommended Products</h1>
        <div className="re-card-container">
          {randomizedProducts[0] && (
            <RecommendedCard
              product={randomizedProducts[0]}
              key={randomizedProducts[0].id}
            />
          )}
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((recommended) => (
              <RecommendedCard product={recommended} key={recommended.id} />
            ))
          ) : (
            <div className="n-product">No products found.</div>
          )}
        </div>
        <div className="pagination-buttons">
          {currentPage > 1 && (
            <button className="pagination-button" onClick={handlePreviousPage}>
              Previous Page
            </button>
          )}
          {currentPage < totalPages && (
            <button className="pagination-button" onClick={handleNextPage}>
              Next Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
