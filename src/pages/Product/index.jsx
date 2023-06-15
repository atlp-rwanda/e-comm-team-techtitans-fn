import SideBar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import NavBar from "../../components/NavMenu/NavBar";
import "../../styles/interface.scss";
import AddProductForm from "./AddProduct";

function ProductAdd() {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <Content>
          <AddProductForm />
        </Content>
      </div>
      <SideBar />
    </>
  );
}

export default ProductAdd;
