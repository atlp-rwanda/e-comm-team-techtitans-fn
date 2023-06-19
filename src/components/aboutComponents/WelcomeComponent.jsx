import Navbar from "./Navbar";
import Header from "../Header/Header";
import WelcomePage from "../../pages/aboutPages/WelcomePage";
import Footer from "../Footer/Footer";
import "../../styles/aboutPages.scss";

const WelcomeComponent = () => {
  return (
    <>
      <Header />
      <div className="aboutGeneral">
        <div className="leftContents">
          <WelcomePage />
        </div>
        <div className="navbar2">
          <Navbar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomeComponent;
