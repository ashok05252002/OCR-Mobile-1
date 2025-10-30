import React from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, color = 'primary', icon: Icon }) => {
  const colors = {
    primary: { bg: 'bg-blue-100', text: 'text-blue-600' },
    success: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    warning: { bg: 'bg-amber-100', text: 'text-amber-600' },
    danger: { bg: 'bg-rose-100', text: 'text-rose-600' },
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-4 relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-2xl font-bold text-gray-900"
              >
                {value}
              </motion.p>
            </div>
            {Icon && (
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className={`p-3 rounded-full ${colors[color].bg}`}
              >
                <Icon size={20} className={colors[color].text} />
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
