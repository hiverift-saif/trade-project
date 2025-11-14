import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://192.168.0.112:3000/api/v1",
   baseURL: "http://68.178.170.69:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // MATCHING KEY
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default apiClient;
