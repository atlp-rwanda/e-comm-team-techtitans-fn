import SellerProduct from "../../components/Dashboard/SellerProduct";
import NavBar from "../../components/NavMenu/NavBar";
import SideBar from "../../components/SideBar/SideBar";
function SellersDashboard() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <SideBar />
        <SellerProduct />
      </div>
    </>
  );
}

export default SellersDashboard;
