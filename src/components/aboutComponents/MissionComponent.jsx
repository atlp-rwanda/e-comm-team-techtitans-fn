import Navbar from "./Navbar";
import Header from "../Header/Header";
import MissionPage from "../../pages/aboutPages/MissionPage";
import Footer from "../Footer/Footer";
import "../../styles/aboutPages.scss";
const MissionComponent = () => {
  return (
    <>
      <Header />
      <div className="aboutGeneral">
        <div className="leftContents">
          <MissionPage />
        </div>
        <div className="navbar2">
          <Navbar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MissionComponent;
