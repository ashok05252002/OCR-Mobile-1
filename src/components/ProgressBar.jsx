import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100 }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const isOverBudget = percentage > 100;

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>₹{value.toLocaleString('en-IN')}</span>
        <span>₹{Number(max).toLocaleString('en-IN')}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full transition-colors duration-300 ${isOverBudget ? 'bg-red-500' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {isOverBudget && (
        <p className="text-xs text-red-500 mt-1 text-right">
          Over budget by ₹{(value - max).toLocaleString('en-IN')}
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
