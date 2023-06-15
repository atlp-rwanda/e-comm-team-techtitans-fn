import Header from "../Header/Header.jsx";
import Content from "./About.jsx";
import { TeamPage } from "../../pages/About/TeamPage.jsx";
import "../../styles/about.scss";
import Footer from "../Footer/Footer.jsx";

export default function Team() {
  return (
    <>
      <Header />
      <Content />
      <div className="leftSidebar">
        <TeamPage />
      </div>
      <Footer />
    </>
  );
}
