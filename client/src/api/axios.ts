import axios from "axios";

export const api = axios.create({
  baseURL: "https://todo-frontend-mentor-challenge-server.onrender.com/api",
});

export const addTokenToRequest = () => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });
};
