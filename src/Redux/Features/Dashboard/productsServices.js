import { productsEndpoint } from "../../../Constants";
import API from "../../api";
import { BASE_URL } from "../../../utils/apiUtilis";

const getProducts = async () => {
  const response = await API.get(`${BASE_URL}/api/v1/${productsEndpoint}`);

  return response?.data?.data;
};

const getSingleProduct = async (id) => {
  const response = await API.get(
    `${BASE_URL}/api/v1/${productsEndpoint}/${id}`
  );

  return response?.data?.data;
};

const productsServices = { getProducts, getSingleProduct };

export default productsServices;
