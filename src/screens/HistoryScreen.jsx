import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BillCard from '../components/BillCard';
import TabBar from '../components/TabBar';
import TopBar from '../components/TopBar';
import { Search, Filter } from 'lucide-react';

const HistoryScreen = ({ activeTab, onTabChange, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'claimed', label: 'Claimed' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'pending', label: 'Pending' },
  ];

  const mockBills = [
    {
      id: 1,
      vendorName: 'Office Supplies Co.',
      date: '2025-01-10',
      billNumber: 'INV-2025-001',
      amount: '125.50',
      status: 'approved',
      submissionDate: '2025-01-11',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
    {
      id: 2,
      vendorName: 'Tech Solutions Ltd.',
      date: '2025-01-08',
      billNumber: 'INV-2025-002',
      amount: '850.00',
      status: 'pending',
      submissionDate: '2025-01-09',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
    {
      id: 3,
      vendorName: 'Catering Services',
      date: '2025-01-05',
      billNumber: 'INV-2025-003',
      amount: '275.25',
      status: 'rejected',
      submissionDate: '2025-01-06',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
    {
      id: 4,
      vendorName: 'Travel Agency',
      date: '2025-01-03',
      billNumber: 'INV-2025-004',
      amount: '1200.00',
      status: 'claimed',
      submissionDate: '2025-01-04',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
  ];

  const filteredBills = mockBills.filter(bill => {
    const matchesFilter = activeFilter === 'all' || bill.status === activeFilter;
    const matchesSearch = bill.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBillClick = (bill) => {
    onNavigate('bill-detail', bill);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Bill History" onNavigate={onNavigate} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900"
          >
            Bill History
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Track your submitted bills
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex space-x-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => handleBillClick(bill)}
                className="cursor-pointer mb-3"
              >
                <BillCard bill={bill} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center py-16"
            >
              <Filter size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bills found matching your criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default HistoryScreen;
