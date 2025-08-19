import axios from "axios";

// Update this to your deployed backend URL
const API_URL = "https://drive-clone-backend-qsyp.onrender.com/api";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Create Axios instance
const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const handleRequest = async (promise) => {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    console.error("API Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || err.message || "API request failed");
  }
};

// ===== AUTH =====
export const signupUser = (fullName, email, password) =>
  handleRequest(axiosInstance.post("/auth/signup", { fullName, email, password }));

export const loginUser = (email, password) =>
  handleRequest(axiosInstance.post("/auth/login", { email, password }));

// ===== FOLDERS =====
export const fetchFolders = () => handleRequest(axiosInstance.get("/folders"));

export const createFolder = (name) => {
  if (!name.trim()) throw new Error("Folder name is required");
  return handleRequest(axiosInstance.post("/folders", { name }));
};

export const deleteFolder = (id) => {
  if (!id) throw new Error("Folder ID is required");
  return handleRequest(axiosInstance.delete(`/folders/hard-delete/${id}`));
};

// ===== FILES =====
export const fetchFiles = () => handleRequest(axiosInstance.get("/files"));

export const uploadFile = async (file, folderId = null) => {
  if (!file) throw new Error("File is required");
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) formData.append("folderId", folderId);

  const res = await axiosInstance.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.file; // return the newly uploaded file
};

export const deleteFile = (id, hard = false) => {
  if (!id) throw new Error("File ID is required");
  const url = hard ? `/files/hard-delete/${id}` : `/files/delete/${id}`;
  return handleRequest(axiosInstance.delete(url));
};
