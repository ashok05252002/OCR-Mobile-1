import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { Ban } from 'lucide-react';

const RejectionPolicyScreen = ({ onBack }) => {
  const [autoRejectDays, setAutoRejectDays] = useState(30);

  const handleSave = () => {
    alert(`Rejection policy saved: Bills older than ${autoRejectDays} days will be auto-rejected.`);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Rejection Policies" onBack={onBack} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Ban size={20} className="mr-2 text-red-500" />
                Auto-Rejection Rule
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Automatically reject bills that were submitted too late. This policy applies to the time between the bill date and the submission date.
            </p>

            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <label className="text-sm font-medium text-gray-700 flex-1">
                Reject bills older than (days):
              </label>
              <Input
                type="number"
                value={autoRejectDays}
                onChange={(e) => setAutoRejectDays(e.target.value)}
                className="w-24 mb-0"
                min="0"
              />
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 100 }} 
        transition={{ ease: "easeInOut" }} 
        className="fixed bottom-0 left-0 right-0 max-w-mobile mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-30"
      >
        <Button onClick={handleSave} className="w-full">
          Save Policy
        </Button>
      </motion.div>
    </div>
  );
};

export default RejectionPolicyScreen;
