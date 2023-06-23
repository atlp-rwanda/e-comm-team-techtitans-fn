import Navbar from "./Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/aboutPages.scss";
import FaqsPage from "../../pages/aboutPages/FaqsPage";
const FaqsComponent = () => {
  return (
    <>
      <Header />
      <div className="aboutGeneral">
        <div className="leftContents">
          <FaqsPage />
        </div>
        <div className="navbar2">
          <Navbar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FaqsComponent;
