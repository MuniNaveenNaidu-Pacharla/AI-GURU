import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const MainLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-b from-primary-50 to-white'
    }`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;