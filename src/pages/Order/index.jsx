import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import OrderTable from "./OrderTable";
import "../../styles/interface.scss";

function ListUser() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <p className="title">Orders</p>
          <OrderTable />
        </Content>
      </div>
      <SideBar />
    </>
  );
}

export default ListUser;
