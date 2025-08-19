// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold">DriveClone</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-900 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-gray-900 transition"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20">
        <h2 className="text-5xl font-bold mb-6">Welcome to DriveClone</h2>
        <p className="text-lg text-gray-300 max-w-3xl mb-8">
          DriveClone is a secure and easy-to-use cloud storage platform. Upload, organize, and
          share your files and folders seamlessly. Access your data from anywhere, anytime.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </main>

      {/* How to Use / Help Section */}
      <section className="bg-gray-800 py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-6">How to Get Started</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
          <div className="p-4 border border-gray-700 rounded">
            <h4 className="font-semibold mb-2">1. Sign Up</h4>
            <p>Create a free account to start uploading your files securely.</p>
          </div>
          <div className="p-4 border border-gray-700 rounded">
            <h4 className="font-semibold mb-2">2. Upload Files & Folders</h4>
            <p>Organize your files by creating folders and uploading files easily.</p>
          </div>
          <div className="p-4 border border-gray-700 rounded">
            <h4 className="font-semibold mb-2">3. Share & Access Anywhere</h4>
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
