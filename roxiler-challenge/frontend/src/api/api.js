import axios from "axios";

const API_URL = "http://localhost:5000/api";

// auth
export const loginUser = (email, password) =>
  axios.post(`${API_URL}/auth/login`, { email, password });

export const registerUser = (name, email, password, address, role) =>
  axios.post(`${API_URL}/auth/register`, { name, email, password, address, role });

// admin
export const getAdminStats = (token) =>
  axios.get(`${API_URL}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } });

export const getUsers = (token) =>
  axios.get(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });

export const getStores = (token) =>
  axios.get(`${API_URL}/admin/stores`, { headers: { Authorization: `Bearer ${token}` } });

export const addUser = (userData, token) =>
  axios.post(`${API_URL}/admin/add-user`, userData, { headers: { Authorization: `Bearer ${token}` } });

export const addStore = (storeData, token) =>
  axios.post(`${API_URL}/admin/add-store`, storeData, { headers: { Authorization: `Bearer ${token}` } });

// ratings
export const getStoreRatings = (token) =>
  axios.get(`${API_URL}/owner/ratings`, { headers: { Authorization: `Bearer ${token}` } });

//ratings given by user
export const getUserRatings = (token) =>
  axios.get(`${API_URL}/user/ratings`, { headers: { Authorization: `Bearer ${token}` } });



// submit a rating for a store
export const submitRating = (storeId, ratingData, token) => {
  return axios.post(`${API_URL}/user/rate/${storeId}`, ratingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


