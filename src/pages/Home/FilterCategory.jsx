import Header from "../../components/Header/Header";
import Content from "../../components/FilterContent.jsx";
import Footer from "../../components/Footer/Footer";
import "./Home.scss";
import { ThemeProvider } from "../../components/Theme/ThemeContext";
let FilterCategories = () => {
  return (
    <main>
      <Header />
      <Content />
      <Footer />
    </main>
  );
};

export default FilterCategories;
