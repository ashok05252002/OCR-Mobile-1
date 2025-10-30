import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', padding = 'p-4', shadow = 'shadow-sm', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl ${shadow} border border-gray-200 ${padding} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
