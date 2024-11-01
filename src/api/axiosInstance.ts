import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");

    if (user) {
      const token = JSON.parse(user).token;

      if (token) {
        config.headers["authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
