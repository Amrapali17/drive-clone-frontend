import React, { useState } from "react";
import { uploadFile } from "../services/api";
import { useDarkMode } from "../theme/DarkmodeContext";

export default function FileUploadModal({ folders, onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { darkMode } = useDarkMode();

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file.");
    try {
      const newFile = await uploadFile(selectedFile, selectedFolder || null);
      onUpload(newFile); // pass new file to dashboard
      onClose();
      alert("File uploaded successfully");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div
        className={`p-6 rounded-lg w-96 shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Upload File</h2>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="mb-4 w-full"
        />
        {folders.length > 0 && (
          <select
            value={selectedFolder || ""}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="">Select folder (optional)</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
