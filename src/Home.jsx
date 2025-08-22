// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative">
      {/* Login / Signup buttons in top-right corner */}
      <div className="absolute top-4 right-8 flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          Signup
        </Link>
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32">
        <h1 className="text-6xl font-bold mb-6">Welcome to DriveClone</h1>
        <p className="text-lg text-gray-300 max-w-3xl mb-8">
          DriveClone is a secure and easy-to-use cloud storage platform. Upload, organize, and
          share your files and folders seamlessly. Access your data from anywhere, anytime.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </main>

      {/* How to Use / Help Section */}
      <section className="bg-gray-800 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">How to Get Started</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
          <div className="p-4 border border-gray-700 rounded">
            <h3 className="font-semibold mb-2">1. Sign Up</h3>
            <p>Create a free account to start uploading your files securely.</p>
          </div>
          <div className="p-4 border border-gray-700 rounded">
            <h3 className="font-semibold mb-2">2. Upload Files & Folders</h3>
            <p>Organize your files by creating folders and uploading files easily.</p>
          </div>
          <div className="p-4 border border-gray-700 rounded">
            <h3 className="font-semibold mb-2">3. Share & Access Anywhere</h3>
            <p>Share files with others and access your data from any device.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center">
        <p>© 2025 DriveClone. All rights reserved.</p>
      </footer>
    </div>
  );
}
