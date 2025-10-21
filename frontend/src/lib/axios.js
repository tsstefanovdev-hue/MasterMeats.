import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://mastermeats-backend.onrender.com/api
  withCredentials: true, // send cookies
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Axios request:", config.baseURL + config.url);
  return config;
});

export default axiosInstance;
