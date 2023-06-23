import SellerProduct from "../../components/Dashboard/SellerProduct";
import NavBar from "../../components/NavMenu/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Toast from "../../components/Toast";
function SellersDashboard() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Toast />
        <SideBar />
        <SellerProduct />
      </div>
    </>
  );
}

export default SellersDashboard;
