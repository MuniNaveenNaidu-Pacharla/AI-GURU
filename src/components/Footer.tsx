import React from 'react';
import { Github, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © 2025 AIGURU – Built for the Bolt Hackathon
            </p>
          </div>
          <div className="flex items-center">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <Zap size={16} className="mr-1.5" />
              Built with Bolt.new
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;