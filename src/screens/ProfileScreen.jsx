import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import TopBar from '../components/TopBar';
import { User, Mail, Phone, LogOut, Settings, Bell, Shield, Wallet } from 'lucide-react';

const ProfileScreen = ({ onNavigate, onBack }) => {
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1 (555) 123-4567',
    joinDate: 'January 2024',
    role: 'Manager',
    department: 'Finance',
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onNavigate('login');
    }
  };

  const menuItems = [
    { icon: Wallet, label: 'Budget Overview', action: () => onNavigate('budget-overview') },
    { icon: Bell, label: 'Notifications', action: () => alert('Notifications settings') },
    { icon: Shield, label: 'Privacy & Security', action: () => alert('Privacy settings') },
    { icon: Settings, label: 'App Settings', action: () => alert('App settings') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <TopBar title="Profile" onBack={onBack} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{userInfo.name}</h3>
                <p className="text-gray-600">{userInfo.role} • {userInfo.department}</p>
                <p className="text-sm text-gray-500">Member since {userInfo.joinDate}</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <Mail size={16} className="text-gray-500 mr-3" />
                <span className="text-gray-700">{userInfo.email}</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-gray-500 mr-3" />
                <span className="text-gray-700">{userInfo.mobile}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Account</h3>
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon size={20} className="text-gray-500 mr-3" />
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </div>
                  <span className="text-gray-400 font-bold text-lg">›</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleLogout}
            variant="danger"
            className="w-full flex items-center justify-center"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileScreen;
