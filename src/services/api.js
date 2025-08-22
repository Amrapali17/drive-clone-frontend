import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://drive-clone-backend-qsyp.onrender.com/api"
    : "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

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

export const createFolder = (name) =>
  handleRequest(axiosInstance.post("/folders", { name }));

export const deleteFolder = (id) =>
  handleRequest(axiosInstance.delete(`/folders/hard-delete/${id}`));

// ===== FILES =====
export const fetchFiles = () => handleRequest(axiosInstance.get("/files"));

// file upload with FormData (required by backend)
export const uploadFile = async (file, folderId = "") => {
  if (!file) throw new Error("File is required");

  const formData = new FormData();
  formData.append("file", file);               // actual file
  formData.append("name", file.name);          // required by backend
  formData.append("folder_id", folderId || ""); // optional folder

  const res = await axiosInstance.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteFile = (id, hard = false) => {
  const url = hard ? `/files/hard-delete/${id}` : `/files/${id}`;
  return handleRequest(axiosInstance.delete(url));
};
