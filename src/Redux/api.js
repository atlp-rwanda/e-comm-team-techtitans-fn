import axios from "axios";
import { BASE_URL } from "../utils/apiUtilis";

// App Base API URL
const API = axios.create({
  baseURL: BASE_URL,
});

// interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("test_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
