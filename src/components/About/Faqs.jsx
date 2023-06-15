import Header from "../Header/Header.jsx";
import Content from "./About.jsx";
import { FaqsPage } from "../../pages/About/FaqsPage.jsx";
import "../../styles/about.scss";
import Footer from "../Footer/Footer.jsx";

export const Faqs = () => {
  return (
    <>
      <Header />
      <Content />
      <div className="leftSidebar">
        <FaqsPage />
      </div>
      <Footer />
    </>
  );
};
