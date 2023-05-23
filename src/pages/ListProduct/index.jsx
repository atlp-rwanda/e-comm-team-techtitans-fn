import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import UserTable from "./UserTable";
import "../../styles/interface.scss";

function ListUser() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <h2>List of Users</h2>
          <UserTable />
        </Content>
      </div>
      <SideBar />
    </>
  );
}

export default ListUser;
