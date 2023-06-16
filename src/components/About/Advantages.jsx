import { AdvantagesPage } from "../../pages/About/AdvantagesPage.jsx";
import Header from "../Header/Header.jsx";
import Content from "./About.jsx";
import "../../styles/about.scss";
import Footer from "../Footer/Footer.jsx";

export const Advantages = () => {
  return (
    <>
      <Header />
      <Content />
      <div className="leftSidebar">
        <AdvantagesPage />
      </div>
      <Footer />
    </>
  );
};
