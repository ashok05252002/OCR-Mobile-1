import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import Card from '../components/Card';
import { Download, Edit3, Calendar, FileText, Hash, User, Building } from 'lucide-react';

const BillDetailScreen = ({ bill, onNavigate, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    vendorName: bill?.vendorName || '',
    billDate: bill?.date || '',
    billNumber: bill?.billNumber || '',
    totalAmount: bill?.amount || '',
  });

  if (!bill) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar title="Bill Details" onBack={onBack} />
        <div className="max-w-mobile mx-auto px-4 py-6 text-center">
          <p className="text-gray-600">Bill not found or has been removed.</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    alert('Bill details updated successfully!');
  };

  const handleChange = (field) => (e) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    claimed: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <TopBar title="Bill Details" onBack={onBack} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Bill Summary</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[bill.status]}`}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Receipt Image</h3>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center"
              >
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-4 mb-4">
              <img 
                src={bill.billImage || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/f3f4f6/1f2937?text=Bill+Receipt'} 
                alt="Bill Receipt" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Bill Information</h3>
              {!isEditing && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center"
                >
                  <Edit3 size={16} className="mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText size={16} className="text-gray-500 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                    <input
                      type="text"
                      value={editData.vendorName}
                      onChange={handleChange('vendorName')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-500 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
                    <input
                      type="date"
                      value={editData.billDate}
                      onChange={handleChange('billDate')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <Hash size={16} className="text-gray-500 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Number</label>
                    <input
                      type="text"
                      value={editData.billNumber}
                      onChange={handleChange('billNumber')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-500 mr-3 font-bold">₹</span>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editData.totalAmount}
                      onChange={handleChange('totalAmount')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText size={16} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Vendor Name</p>
                    <p className="font-medium text-gray-900">{bill.vendorName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Bill Date</p>
                    <p className="font-medium text-gray-900">{bill.date}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Hash size={16} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Bill Number</p>
                    <p className="font-medium text-gray-900">{bill.billNumber}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-primary mr-3 font-bold text-xl">₹</span>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-bold text-primary">{bill.amount}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h3>
            <div className="space-y-4">
              {bill.submittedBy && (
                <div className="flex items-center">
                  <User size={16} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Submitted By</p>
                    <p className="font-medium text-gray-900">{bill.submittedBy}</p>
                  </div>
                </div>
              )}

              {bill.department && (
                <div className="flex items-center">
                  <Building size={16} className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium text-gray-900">{bill.department}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Submission Date</p>
                  <p className="font-medium text-gray-900">{bill.submissionDate}</p>
                </div>
              </div>

              {bill.approvedBy && (
                <div className="flex items-center">
                  <User size={16} className="text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Approved By</p>
                    <p className="font-medium text-green-700">{bill.approvedBy} on {bill.approvedDate}</p>
                  </div>
                </div>
              )}

              {bill.rejectedBy && (
                <div className="flex items-center">
                  <User size={16} className="text-red-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Rejected By</p>
                    <p className="font-medium text-red-700">{bill.rejectedBy} on {bill.rejectedDate}</p>
                    {bill.rejectionReason && (
                      <p className="text-sm text-red-600 mt-1">Reason: {bill.rejectionReason}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BillDetailScreen;
