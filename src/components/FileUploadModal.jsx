import React, { useState } from "react";
import { uploadFile } from "../services/api";

export default function FileUploadModal({ folders, onClose, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Uploading file:", selectedFile.name);
      await uploadFile(selectedFile, selectedFolder || "");
      onUpload(); // refresh dashboard
      setSelectedFile(null);
      setSelectedFolder("");
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      onClick={onClose}
    >
      <div
        className="p-6 rounded-lg w-96 shadow-lg bg-white text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Upload File</h2>

        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="mb-2 w-full"
        />
        {selectedFile && <p className="mb-2 text-sm">Selected: {selectedFile.name}</p>}

        {folders.length > 0 && (
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="">None</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        )}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`px-4 py-2 rounded ${
              selectedFile
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
