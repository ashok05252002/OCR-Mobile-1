import React from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import Card from '../components/Card';
import { Settings, Ban, BellRing, ChevronRight } from 'lucide-react';

const ConfigScreen = ({ activeTab, onTabChange, onNavigate }) => {
  const configItems = [
    {
      title: 'Expense Policies',
      description: 'Manage roles, categories, and budgets.',
      icon: Settings,
      action: () => onNavigate('expense-config'),
    },
    {
      title: 'Rejection Policies',
      description: 'Set rules for automatic bill rejection.',
      icon: Ban,
      action: () => onNavigate('rejection-policy'),
    },
    {
      title: 'Notification Settings',
      description: 'Configure reminders for users and managers.',
      icon: BellRing,
      action: () => onNavigate('notification-config'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Configuration" onNavigate={onNavigate} />
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Fine-tune your expense management system.</p>
        </motion.div>

        <div className="space-y-4">
          {configItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={item.action}
              className="cursor-pointer"
            >
              <Card className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <item.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default ConfigScreen;
