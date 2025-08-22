import React, { useEffect, useState } from "react";
import { fetchFiles, fetchFolders, createFolder, deleteFile, deleteFolder } from "../services/api";
import FileUploadModal from "../components/FileUploadModal";

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("files");

  // Load all data
  const loadData = async () => {
    try {
      const [fetchedFolders, fetchedFiles] = await Promise.all([fetchFolders(), fetchFiles()]);
      setFolders(fetchedFolders);
      setFiles(fetchedFiles);
    } catch (err) {
      console.error("Load data error:", err.message);
    }
  };

  useEffect(() => {
    if (activeTab === "files") loadData();
  }, [activeTab]);

  // Create folder
  const handleCreateFolder = async () => {
    if (!newFolder.trim()) return;
    await createFolder(newFolder);
    setNewFolder("");
    loadData();
  };

  // Delete file (hard delete)
  const handleDeleteFile = async (id) => {
    await deleteFile(id, true);
    loadData();
  };

  // Delete folder
  const handleDeleteFolder = async (id) => {
    await deleteFolder(id);
    loadData();
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-700">Drive Clone</div>
        <nav className="flex-1 p-4 space-y-4">
          <button
            className={`w-full text-left px-3 py-2 rounded ${activeTab === "files" ? "bg-blue-700" : "hover:bg-blue-800"}`}
            onClick={() => setActiveTab("files")}
          >
            📁 My Files
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${activeTab === "settings" ? "bg-blue-700" : "hover:bg-blue-800"}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-blue-100 p-6 overflow-y-auto">
        {activeTab === "files" && (
          <>
            {/* Actions */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="New folder name"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                className="p-2 border rounded w-64"
              />
              <button
                onClick={handleCreateFolder}
                className="bg-green-600 px-4 py-2 rounded text-white"
              >
                Create Folder
              </button>
              <button
                onClick={() => setShowUpload(true)}
                className="bg-blue-600 px-4 py-2 rounded text-white"
              >
                Upload File
              </button>
            </div>

            {/* Folders */}
            <h2 className="text-xl font-semibold mb-2">📁 Folders</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
                >
                  <span>{folder.name}</span>
                  <button
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="text-red-600"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            {/* Files */}
            <h2 className="text-xl font-semibold mb-2">📄 Files</h2>
            <div className="grid grid-cols-3 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-red-600"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">⚙️ Settings</h2>
            <div className="flex items-center gap-3 mb-6">
              <span>Dark Mode: Disabled for submission</span>
            </div>

            <h2 className="text-xl font-semibold mb-4">❓ Help</h2>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded shadow">
                <p className="font-semibold">Q: How to upload files?</p>
                <p>A: Click "Upload File" and choose a file.</p>
              </div>
              <div className="p-3 bg-white rounded shadow">
                <p className="font-semibold">Q: How to create folders?</p>
                <p>A: Enter a folder name and click "Create Folder".</p>
              </div>
              <div className="p-3 bg-white rounded shadow">
                <p className="font-semibold">Q: How to delete?</p>
                <p>A: Use ❌ button next to folder/file.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <FileUploadModal
          onClose={() => setShowUpload(false)}
          onUpload={loadData}
          folders={folders}
        />
      )}
    </div>
  );
}
