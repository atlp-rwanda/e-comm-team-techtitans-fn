import Header from "../../components/Header/Header";
import Content from "../../components/Home.jsx";
import Footer from '../../components/Footer/Footer'
import './Home.scss'
import PasswordExpirationModal from "../../components/Popups/changePassword";
import { ThemeProvider } from "../../components/Theme/ThemeContext";
let Home = () => {
  return (
   
      <main>
        <Header />
        <Content />
        <PasswordExpirationModal />
        <Footer />
      </main>
  
  );
};

export default Home;