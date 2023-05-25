import Header from "../../components/Header/Header";
import Content from "../../components/Categories.jsx";
import PasswordExpirationModal from "../../components/Popups/changePassword";
let Categories = () => {
  return (
    <>
      <Header />
      <Content />
      <PasswordExpirationModal/>
    </>
  );
};

export default Categories;
