import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ enabled, setEnabled }) => {
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className={`flex items-center w-12 h-7 rounded-full cursor-pointer transition-colors duration-300 ${
        enabled ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md"
      />
    </div>
  );
};

export default ToggleSwitch;
