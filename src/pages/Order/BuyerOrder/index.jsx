import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "../../Home/Home.scss";
import "../../../components/Content/content.scss";
import OrderContent from "../../../components/Content/OrderContent.jsx";
import OrderContainer from "./OrderContainer";
let Home = () => {
  return (
    <main>
      <Header />
      <OrderContent>
        <div className="order-header">
          <h4>My Orders</h4>
        </div>
        <OrderContainer />
      </OrderContent>
      <Footer />
    </main>
  );
};

export default Home;
