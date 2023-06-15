import Header from "../Header/Header.jsx";
import Content from "./About.jsx";
import "../../styles/about.scss";
import { WelcomePage } from "../../pages/About/WelcomePage.jsx";
import Footer from "../Footer/Footer";
export const Welcome = () => {
  return (
    <>
      <Header />
      <Content />
      <div className="leftSidebar">
        <WelcomePage />
      </div>
      <Footer />
    </>
  );
};
