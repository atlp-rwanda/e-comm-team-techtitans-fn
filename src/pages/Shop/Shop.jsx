import Header from "../../components/Header/Header";
import Content from "../../components/Shop.jsx";
import PasswordExpirationModal from "../../components/Popups/changePassword";
let Shop = () => {
  return (
    <>
      <Header />
      <Content />
      <PasswordExpirationModal/>
    </>
  );
};

export default Shop;
