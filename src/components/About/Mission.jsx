import Header from "../Header/Header.jsx";
import Content from "./About.jsx";
import { MissionPage } from "../../pages/About/MissionPage.jsx";
import "../../styles/about.scss";
import Footer from "../Footer/Footer.jsx";

export default function Mission() {
  return (
    <>
      <Header />
      <Content />
      <div className="leftSidebar">
        <MissionPage />
      </div>
      <Footer />
    </>
  );
}
