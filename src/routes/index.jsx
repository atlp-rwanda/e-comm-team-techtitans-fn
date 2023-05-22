import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories/Categories.jsx";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import ListUser from "../pages/ListofUser";

let allRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/dashboard" element={<ListUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default allRoutes;
