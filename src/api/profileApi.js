import apiClient from "./apiClient";

// 🔹 Get profile
export const getProfile = async () => {
  const response = await apiClient.get("/profile");
  return response.data;
};

// 🔹 Update profile
export const updateProfile = async (data) => {
  const response = await apiClient.put("/profile", data);
  return response.data;
};
