import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import TabBar from '../components/TabBar';
import TopBar from '../components/TopBar';
import FloatingButton from '../components/FloatingButton';
import Card from '../components/Card';
import { FileText, Clock, CheckCircle, XCircle, PieChart, History, ArrowRight } from 'lucide-react';

const DashboardScreen = ({ activeTab, onTabChange, onNavigate }) => {
  const stats = [
    { title: 'Total Claimed', value: '142', color: 'primary', icon: FileText },
    { title: 'Pending Bills', value: '8', color: 'warning', icon: Clock },
    { title: 'Approved Bills', value: '98', color: 'success', icon: CheckCircle },
    { title: 'Rejected Bills', value: '36', color: 'danger', icon: XCircle },
  ];

  const chartData = [
    { name: 'Approved', value: 98, color: '#10B981', percentage: 69 },
    { name: 'Rejected', value: 36, color: '#EF4444', percentage: 25 },
    { name: 'Pending', value: 8, color: '#F59E0B', percentage: 6 },
  ];

  const handleHistoryClick = () => {
    onTabChange('history');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="" onNavigate={onNavigate} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Welcome back, John!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Here's your bill submission overview
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center mb-4">
              <PieChart size={20} className="text-primary mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Bill Status Overview</h3>
            </div>
            
            <div className="space-y-3">
              {chartData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center flex-1">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center flex-1 mx-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ y: -2 }}
          onClick={handleHistoryClick}
          className="cursor-pointer"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <History size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">View Bill History</h3>
                  <p className="text-gray-600 text-sm">Track all your submitted bills</p>
                </div>
              </div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight size={20} className="text-gray-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      <FloatingButton onClick={() => onNavigate('submit-bill')} />
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default DashboardScreen;
