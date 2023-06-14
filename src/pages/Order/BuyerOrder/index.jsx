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
          <h4>
            Home
            <span>
              <i className="bx bx-chevron-right"></i> Order
            </span>
          </h4>
          <h1>My Orders</h1>
        </div>
        <OrderContainer />
      </OrderContent>
      <Footer />
    </main>
  );
};

export default Home;
