import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-scheduling-vvbm.onrender.com/api/events", 
  headers: { "Content-Type": "application/json" },
});

export default api;
