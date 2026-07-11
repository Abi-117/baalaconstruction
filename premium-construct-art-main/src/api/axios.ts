import axios from "axios";

const api = axios.create({
  baseURL: "https://baalaconstruction.onrender.com/api",
});

export default api;