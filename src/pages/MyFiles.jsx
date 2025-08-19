// src/pages/MyFiles.jsx
import React, { useEffect, useState } from "react";
import { fetchFiles } from "../services/api";

export default function MyFiles() {
  const [files, setFiles] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const loadFiles = async () => {
    try {
      const res = await fetchFiles();
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Load Files Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDeleteFile = async (id) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await fetch(`http://localhost:5000/api/files/hard-delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      loadFiles();
    } catch (err) {
      console.error("Delete File Error:", err.response?.data || err.message);
    }
  };

  return (
    <main className="flex-1 p-6">
      <h2 className="text-3xl font-bold mb-6">My Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((f) => (
          <div
            key={f.id}
            className={`p-4 rounded shadow flex flex-col justify-between ${
              darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
            } transition`}
          >
            <div>
              <p className="font-medium">{f.name}</p>
              <p className="text-sm text-gray-400">{f.size} bytes</p>
              <p className="text-sm text-gray-400">{f.mime_type}</p>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="text-sm text-yellow-400 hover:underline">Rename</button>
              <button
                onClick={() => handleDeleteFile(f.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
