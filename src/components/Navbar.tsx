import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, BookOpen, BarChart, Target, Brain, MessageSquare, Home, Sun, Moon, User, Coins } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <User size={18} /> },
    { to: '/roadmap', label: 'Roadmap', icon: <Rocket size={18} /> },
    { to: '/resources', label: 'Resources', icon: <BookOpen size={18} /> },
    { to: '/tracker', label: 'Career Tracker', icon: <BarChart size={18} /> },
    { to: '/skill-matcher', label: 'Skill Matcher', icon: <Target size={18} /> },
    { to: '/mindset', label: 'Mindset', icon: <Brain size={18} /> },
    { to: '/careercoin', label: 'CareerCoin', icon: <Coins size={18} /> },
    { to: '/ask', label: 'Ask AIGURU', icon: <MessageSquare size={18} /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-poppins font-bold text-primary-600">AI<span className="text-accent-500">GURU</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                  ${location.pathname === link.to
                    ? isDarkMode 
                      ? 'text-primary-400 bg-gray-700'
                      : 'text-primary-700 bg-primary-50'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${
                isDarkMode
                  ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md mr-2 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isDarkMode
                  ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} animate-fade-in`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium 
                  ${location.pathname === link.to
                    ? isDarkMode 
                      ? 'text-primary-400 bg-gray-700'
                      : 'text-primary-700 bg-primary-50'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;