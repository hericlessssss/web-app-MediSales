import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '../stores/useThemeStore';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}