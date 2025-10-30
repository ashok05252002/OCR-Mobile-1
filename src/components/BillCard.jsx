import React from 'react';
import Card from './Card';
import { Calendar, FileText } from 'lucide-react';

const BillCard = ({ bill }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    claimed: 'bg-blue-100 text-blue-800',
  };

  return (
    <Card className="p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{bill.vendorName}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Calendar size={14} className="mr-1" />
            {bill.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FileText size={14} className="mr-1" />
            {bill.billNumber}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900 mb-2">
            ₹{bill.amount}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[bill.status]}`}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </span>
        </div>
      </div>
      {bill.submissionDate && (
        <div className="text-xs text-gray-500 border-t pt-2">
          Submitted: {bill.submissionDate}
        </div>
      )}
    </Card>
  );
};

export default BillCard;
