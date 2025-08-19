import React, { useEffect, useState } from "react";
import {
  fetchFolders,
  createFolder,
  fetchFiles,
  deleteFolder,
  deleteFile,
} from "../services/api";
import FileUploadModal from "../components/FileUploadModal";
import { useDarkMode } from "../theme/DarkmodeContext";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [view, setView] = useState("dashboard"); // "dashboard" = folders+files, "myfiles" = files only

  const { darkMode, toggleDarkMode } = useDarkMode();

  // Load folders
  const loadFolders = async () => {
    try {
      const data = await fetchFolders();
      setFolders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching folders:", err);
      setFolders([]);
    }
  };

  // Load files
  const loadFiles = async () => {
    try {
      const data = await fetchFiles();
      setFiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching files:", err);
      setFiles([]);
    }
  };

  useEffect(() => {
    loadFolders();
    loadFiles();
  }, []);

  // Create new folder
  const handleCreateFolder = async () => {
    if (!newFolder.trim()) return;
    try {
      await createFolder(newFolder);
      setNewFolder("");
      setShowFolderModal(false);
      loadFolders();
    } catch (err) {
      console.error("Error creating folder:", err);
      alert("Failed to create folder");
    }
  };

  // Delete folder
  const handleDeleteFolder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;
    try {
      await deleteFolder(id);
      setFolders((prev) => prev.filter((f) => f.id !== id));
      alert("Folder deleted successfully");
    } catch (err) {
      console.error("Error deleting folder:", err);
      alert("Failed to delete folder");
    }
  };

  // Delete file
  const handleDeleteFile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await deleteFile(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      alert("File deleted successfully");
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Failed to delete file");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">My Drive</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded ${
                view === "dashboard" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setView("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer p-2 rounded ${
                view === "myfiles" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
              onClick={() => setView("myfiles")}
            >
              My Files
            </li>
            <li>
              <div
                className="cursor-pointer p-2 rounded hover:bg-blue-800 flex justify-between items-center"
                onClick={() => setSettingsOpen(!settingsOpen)}
              >
                <span>⚙ Settings</span>
                <span>{settingsOpen ? "▲" : "▼"}</span>
              </div>
              {settingsOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={toggleDarkMode}
                    className="w-full text-left px-2 py-1 rounded hover:bg-blue-700"
                  >
                    {darkMode ? "🌙 Dark Mode ON" : "☀ Light Mode"}
                  </button>

                  <div className="bg-blue-800 text-white p-2 rounded">
                    <p className="font-semibold mb-1">❓ Help / FAQ</p>
                    <ul className="text-sm list-disc list-inside space-y-1">
                      <li>How to create a new folder?</li>
                      <li>How to upload a file?</li>
                      <li>How to delete a folder or file?</li>
                      <li>How to switch to dark mode?</li>
                      <li>How to download a file?</li>
                      <li>How to log out?</li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {view === "dashboard" ? "Dashboard" : "My Files"}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFolderModal(true)}
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 shadow"
            >
              + New Folder
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 shadow"
            >
              ⬆ Upload File
            </button>
          </div>
        </div>

        {/* Dashboard view: Folders + Files */}
        {view === "dashboard" && (
          <div className="mb-10">
            {/* Folders */}
            <h2 className="text-xl font-semibold mb-4">Folders</h2>
            {folders.length === 0 ? (
              <p className="opacity-70">No folders created.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {folders.map((f, index) => (
                  <div
                    key={f.id || `${f.name}-${index}`}
                    className={`p-4 rounded-lg shadow ${
                      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    } hover:shadow-md transition`}
                  >
                    <div className="flex justify-between items-center">
                      <span>📁 {f.name}</span>
                      <button
                        onClick={() => handleDeleteFolder(f.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Files below folders */}
            <h2 className="text-xl font-semibold mb-4">Files</h2>
            {files.length === 0 ? (
              <p className="opacity-70">No files uploaded.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((f, index) => (
                  <div
                    key={f.id || `${f.name}-${index}`}
                    className={`p-4 rounded-lg shadow ${
                      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    } hover:shadow-md transition`}
                  >
                    <p className="font-medium">📄 {f.name}</p>
                    <p className="text-xs opacity-70">{f.size} bytes</p>
                    <button
                      onClick={() => handleDeleteFile(f.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      🗑 Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Files view */}
        {view === "myfiles" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">My Files</h2>
            {files.length === 0 ? (
              <p className="opacity-70">No files uploaded.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((f, index) => (
                  <div
                    key={f.id || `${f.name}-${index}`}
                    className={`p-4 rounded-lg shadow ${
                      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    } hover:shadow-md transition`}
                  >
                    <p className="font-medium">📄 {f.name}</p>
                    <p className="text-xs opacity-70">{f.size} bytes</p>
                    <button
                      onClick={() => handleDeleteFile(f.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      🗑 Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <FileUploadModal
          folders={folders}
          onClose={() => setShowUploadModal(false)}
          onUpload={loadFiles}
        />
      )}

      {/* New Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div
            className={`p-6 rounded-lg w-96 shadow-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">Create Folder</h2>
            <input
              type="text"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              placeholder="Folder name"
              className="border border-gray-300 p-2 rounded w-full mb-4 text-gray-900"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowFolderModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
