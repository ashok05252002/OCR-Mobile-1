import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const FloatingButton = ({ onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-50"
      style={{ boxShadow: '0 4px 20px rgba(0, 122, 255, 0.3)' }}
    >
      <Plus size={24} />
    </motion.button>
  );
};

export default FloatingButton;
