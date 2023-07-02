import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const addTokenToRequest = () => {
  api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token || ""}`;
    return config;
  });
};
