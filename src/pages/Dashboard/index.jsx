import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import "../../styles/interface.scss";

function Dashboard() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <h2 className="title">Dashboard</h2>
        </Content>
      </div>
      <SideBar />
    </>
  );
}

export default Dashboard;
