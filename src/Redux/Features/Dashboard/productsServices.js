import { productsEndpoint } from "../../../Constants";
import API from "../../api";

const getProducts = async () => {
  const response = await API.get(
    `${import.meta.env.VITE_API_KEY}/${productsEndpoint}`
  );


  return response?.data?.data;
};

const getProduct = async (id) => {
  const response = await API.get(
    `${import.meta.env.VITE_API_KEY}/${productsEndpoint}/${id}`
  );

  return response?.data?.data;
};

const productsServices = { getProducts, getProduct };

export default productsServices;
