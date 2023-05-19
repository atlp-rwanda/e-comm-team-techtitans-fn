
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";

let allRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />

       </Routes>
     </BrowserRouter>

  );
};

export default allRoutes;