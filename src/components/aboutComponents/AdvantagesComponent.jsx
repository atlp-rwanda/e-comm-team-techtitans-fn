import Navbar from "./Navbar";
import Header from "../Header/Header";
import AdvantagesPage from "../../pages/aboutPages/AdvantagesPage";
import Footer from "../Footer/Footer";
import "../../styles/aboutPages.scss";

const AdvantagesComponent = () => {
  return (
    <>
      <Header />
      <div className="aboutGeneral">
        <div className="leftContents">
          <AdvantagesPage />
        </div>
        <div className="navbar2">
          <Navbar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdvantagesComponent;
