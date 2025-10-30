import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import BillCard from '../components/BillCard';
import Button from '../components/Button';
import Card from '../components/Card';
import { Search, Filter, CheckCircle, XCircle, X, User, Building } from 'lucide-react';

const ApproveScreen = ({ activeTab, onTabChange, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const pendingBills = [
    {
      id: 1,
      vendorName: 'Office Depot',
      date: '2025-01-14',
      billNumber: 'INV-2025-008',
      amount: '89.99',
      status: 'pending',
      submissionDate: '2025-01-14',
      submittedBy: 'Sarah Johnson',
      department: 'Marketing',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
    {
      id: 2,
      vendorName: 'Amazon Business',
      date: '2025-01-13',
      billNumber: 'INV-2025-009',
      amount: '234.50',
      status: 'pending',
      submissionDate: '2025-01-13',
      submittedBy: 'Mike Chen',
      department: 'IT',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
    {
      id: 3,
      vendorName: 'Starbucks',
      date: '2025-01-15',
      billNumber: 'INV-2025-010',
      amount: '22.75',
      status: 'pending',
      submissionDate: '2025-01-15',
      submittedBy: 'Emily White',
      department: 'Sales',
      billImage: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt',
    },
  ];

  const filteredBills = pendingBills.filter(bill => {
    const matchesSearch = bill.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleApprove = (billId) => {
    alert(`Bill ${billId} approved successfully!`);
  };

  const handleRejectClick = (billId) => {
    setSelectedBillId(billId);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = () => {
    if (rejectReason.trim()) {
      alert(`Bill ${selectedBillId} rejected: ${rejectReason}`);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedBillId(null);
    }
  };

  const handleBillClick = (bill) => {
    onNavigate('bill-detail', bill);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Approve Bills" onNavigate={onNavigate} />
      
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
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Bill Approval
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Review and action pending bills.
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
              placeholder="Search bills, vendor, or submitter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="mb-4"
              >
                <Card className="p-0 overflow-hidden">
                  <div 
                    onClick={() => handleBillClick(bill)}
                    className="cursor-pointer p-4"
                  >
                    <BillCard bill={bill} />
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User size={14} className="mr-2" />
                        <span>{bill.submittedBy}</span>
                      </div>
                      <div className="flex items-center">
                        <Building size={14} className="mr-2" />
                        <span>{bill.department}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRejectClick(bill.id)}
                        className="flex-1 flex items-center justify-center py-2"
                      >
                        <XCircle size={16} className="mr-2" />
                        Reject
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApprove(bill.id)}
                        className="flex-1 flex items-center justify-center py-2"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </Card>
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
              <p className="text-gray-500">No pending bills to review.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reject Bill</h3>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please provide a reason for rejection:
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleRejectConfirm}
                  disabled={!rejectReason.trim()}
                  className="flex-1"
                >
                  Reject Bill
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default ApproveScreen;
