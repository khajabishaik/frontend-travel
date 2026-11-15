import axios from "axios";

const api = axios.create({
 baseURL: "https://travel-backend-h9ju.onrender.com"
});

export default api;
