import  {SingleProductView}  from "../../components/Dashboard/SingleProduct";
import NavBar from "../../components/NavMenu/NavBar";
import SideBar from "../../components/SideBar/SideBar";
function SingleDashboard() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <SideBar />
        <SingleProductView />
      </div>
    </>
  );
}

export default SingleDashboard;
