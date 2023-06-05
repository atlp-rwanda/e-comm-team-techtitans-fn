import Header from "../../components/Header/Header";
import Content from "../../components/Home.jsx";
import Footer from '../../components/Footer/Footer'
import './Home.scss'

let Home = () => {
  return (
    <main>
      <Header />
      <Content />
      <Footer/>
    </main>
  );
};

export default Home;