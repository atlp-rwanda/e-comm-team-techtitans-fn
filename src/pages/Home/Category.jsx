import Header from "../../components/Header/Header";
import Content from "../../components/Home.jsx";
import Footer from "../../components/Footer/Footer";
import "./Home.scss";
import PasswordExpirationModal from "../../components/Popups/changePassword";
import { ThemeProvider } from "../../components/Theme/ThemeContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../../components/Product/CategoryCard";
import { useEffect } from "react";
import { getSingleCategory } from "../../Redux/Features/Product/getCategorySlice";

let Category = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  console.log("id", name);
  const { singleCategory, status, error } = useSelector(
    (state) => state.singleCategory
  );
  useEffect(() => {
    dispatch(getSingleCategory({ name }));
  }, [dispatch, name]);
  const categoryProducts = singleCategory?.data?.name;
  console.log("singleCategory product **********", categoryProducts);
  return (
    <main>
      <Header />
      <div className="category-container">
        <div className="category-title">
          <h1>{categoryProducts}</h1>
        </div>
        <div className="category-subtitle">
          <p>This recent product of the category</p>
        </div>
        <CategoryCard />
      </div>

      <Footer />
    </main>
  );
};

export default Category;
