import React from 'react';
import { Bell, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TopBar = ({ title, onNavigate, onBack }) => {
  const isSubScreen = !!onBack;

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 h-16 flex items-center justify-between">
      {isSubScreen ? (
        <motion.button 
          onClick={onBack} 
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={22} className="text-gray-800" />
        </motion.button>
      ) : (
        <div className="flex items-center h-full">
          <img 
            src="https://www.iproat.com/wp-content/uploads/2025/01/cropped-iProAT-Solutions-Black-180x60.png" 
            alt="iProAT Solutions" 
            className="h-8 w-auto"
          />
        </div>
      )}
      
      <h1 className="text-lg font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
        {title}
      </h1>

      {!isSubScreen && (
        <div className="flex items-center space-x-2">
          <motion.button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>
          <motion.button 
            onClick={() => onNavigate('profile')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <User size={20} className="text-gray-600" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
