import Header from "../../components/Header/Header";
import Content from "../../components/Home.jsx";
import Footer from "../../components/Footer/Footer";
import PasswordExpirationModal from "../../components/Popups/changePassword";
import { ThemeProvider } from "../../components/Theme/ThemeContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../../components/Product/CategoryCard";
let Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, status, error } = useSelector(
    (state) => state.singleProduct
  );
  return (
    <main>
      <Header />

      {/* <PasswordExpirationModal /> */}
      <Footer />
    </main>
  );
};

export default Category;
