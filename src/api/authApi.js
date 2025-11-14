// src/api/authApi.js
import apiClient from "./apiClient";

/**
 * REGISTER
 * POST /auth/register
 * Payload: { name, email, password, phone, role? }
 */
export const registerUser = async (formData) => {
  const payload = {
    name: formData.fullName?.trim() || formData.name?.trim(),
    email: formData.email.trim(),
    password: formData.password,
    phone: formData.mobile || formData.phone,
    role: formData.role || "user", // default
  };

  try {
    const res = await apiClient.post("/auth/register", payload);
    console.log("REGISTER SUCCESS:", res.data); // Console on success
    return res.data;
  } catch (error) {
    const err = error.response?.data || { message: "Registration failed" };
    console.error("REGISTER ERROR:", err); // Console on error
    throw err;
  }
};

/**
 * LOGIN
 * POST /auth/login
 * Payload: { email, password }
 */
export const loginUser = async ({ email, password }) => {
  try {
    const res = await apiClient.post("/auth/login", { email, password });
    console.log("LOGIN SUCCESS.....:", res.data); // Console on success
    return res.data;
  } catch (error) {
    const err = error.response?.data || { message: "Login failed" };
    console.error("LOGIN ERROR:", err); // Console on error
    throw err;
  }
};