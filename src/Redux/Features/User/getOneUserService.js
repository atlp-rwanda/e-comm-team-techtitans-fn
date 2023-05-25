import API from "../../api";
import { BASE_URL } from "../../../utils/apiUtilis";
const getUser = async (id) => {
  const response = await API.get(
    `${BASE_URL}/api/v1/user/profile/user/${id}`
  );

  return response?.data?.data;
};
const changePassword = async (id) => {
  const response = await API.put(
    `${BASE_URL}/api/v1/user/editpassword/${id}`
  );

  return response?.data?.data;
};

const UserServices = { getUser,changePassword };

export default UserServices;