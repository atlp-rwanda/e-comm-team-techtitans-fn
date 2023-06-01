import axios from "axios";

// App Base API URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
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
