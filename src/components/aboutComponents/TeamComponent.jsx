import Navbar from "./Navbar";
import Header from "../Header/Header";
import TeamPage from "../../pages/aboutPages/TeamPage";
import Footer from "../Footer/Footer";
import "../../styles/aboutPages.scss";
const TeamComponent = () => {
  return (
    <>
      <Header />
      <div className="aboutGeneral">
        <div className="leftContents">
          <TeamPage />
        </div>
        <div className="navbar2">
          <Navbar />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeamComponent;
