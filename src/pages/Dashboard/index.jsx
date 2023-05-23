import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import "../../styles/interface.scss";

function ListUser() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <h2>Dashboard</h2>
        </Content>
      </div>
      <SideBar />
    </>
  );
}

export default ListUser;
