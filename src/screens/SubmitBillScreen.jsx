import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import TopBar from '../components/TopBar';
import { Camera, Upload, CheckCircle, FileText, X } from 'lucide-react';

const SubmitBillScreen = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState('upload'); // 'upload', 'preview', 'submitted'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [billData, setBillData] = useState({
    vendorName: '',
    billDate: '',
    billNumber: '',
    totalAmount: '',
  });
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false);

  const initialDrafts = [
    { id: 1, vendorName: 'Stationery World', date: '2025-01-20', billNumber: 'DRAFT-001', amount: '45.00', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/e2e8f0/475569?text=Draft+1' },
    { id: 2, vendorName: 'Quick Eats', date: '2025-01-18', billNumber: 'DRAFT-002', amount: '19.50', image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/e2e8f0/475569?text=Draft+2' },
  ];
  const [drafts, setDrafts] = useState(initialDrafts);

  const handleFileUpload = (type) => {
    setUploadedFile(`${type}-upload.jpg`);
    setTimeout(() => {
      setBillData({
        vendorName: 'Sample Vendor',
        billDate: '2025-01-15',
        billNumber: 'INV-2025-001',
        totalAmount: '125.50',
      });
      setStep('preview');
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('submitted');
  };

  const handleChange = (field) => (e) => {
    setBillData({ ...billData, [field]: e.target.value });
  };

  const handleAttemptBack = () => {
    if (billData.vendorName || billData.billDate || billData.billNumber || billData.totalAmount) {
      setShowSaveDraftModal(true);
    } else {
      setStep('upload');
    }
  };

  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      vendorName: billData.vendorName,
      date: billData.billDate,
      billNumber: billData.billNumber,
      amount: billData.totalAmount,
      image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/300x400/e2e8f0/475569?text=Saved+Draft'
    };
    setDrafts(prev => [newDraft, ...prev]);
    resetAndGoToUpload();
  };
  
  const handleDiscard = () => {
    resetAndGoToUpload();
  };

  const resetAndGoToUpload = () => {
    setShowSaveDraftModal(false);
    setStep('upload');
    setBillData({ vendorName: '', billDate: '', billNumber: '', totalAmount: '' });
    setUploadedFile(null);
  };

  const handleContinueDraft = (draftToContinue) => {
    setBillData({
      vendorName: draftToContinue.vendorName,
      billDate: draftToContinue.date,
      billNumber: draftToContinue.billNumber,
      totalAmount: draftToContinue.amount,
    });
    setUploadedFile(draftToContinue.image);
    setDrafts(prev => prev.filter(d => d.id !== draftToContinue.id));
    setStep('preview');
  };

  if (step === 'submitted') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar title="Bill Submitted" onBack={onBack} />
        
        <div className="max-w-mobile mx-auto px-4 py-6 flex flex-col justify-center h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <CheckCircle size={48} className="text-white" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-gray-900 mb-3"
            >
              Success!
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg"
            >
              Your bill has been submitted for approval.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white shadow-lg border-0 p-6 mb-6">
              <h3 className="font-bold text-lg text-center text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                Expense Receipt
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 font-medium">Vendor:</span>
                  <span className="font-semibold text-gray-900">{billData.vendorName}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 font-medium">Date:</span>
                  <span className="font-semibold text-gray-900">{billData.billDate}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600 font-medium">Bill #:</span>
                  <span className="font-semibold text-gray-900">{billData.billNumber}</span>
                </div>
                <div className="flex justify-between items-center border-t-2 border-gray-200 pt-3 mt-3">
                  <span className="text-gray-900 font-bold text-lg">Total:</span>
                  <span className="text-2xl font-bold text-primary">₹{billData.totalAmount}</span>
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Button
                onClick={() => onNavigate('dashboard')}
                className="w-full font-bold py-3 text-base"
              >
                Continue to Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar title="Review Bill" onBack={handleAttemptBack} />
        
        <div className="max-w-mobile mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 mb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-100 rounded-xl p-4 mb-6"
              >
                <p className="text-sm text-gray-600 mb-2 font-medium">Uploaded: {uploadedFile}</p>
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img src={uploadedFile} alt="Receipt Preview" className="h-full w-full object-contain rounded-lg" />
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Vendor Name"
                  value={billData.vendorName}
                  onChange={handleChange('vendorName')}
                  placeholder="Enter vendor name"
                  required
                />
                <Input
                  label="Bill Date"
                  type="date"
                  value={billData.billDate}
                  onChange={handleChange('billDate')}
                  required
                />
                <Input
                  label="Bill Number"
                  value={billData.billNumber}
                  onChange={handleChange('billNumber')}
                  placeholder="Enter bill number"
                  required
                />
                <Input
                  label="Total Amount"
                  type="number"
                  step="0.01"
                  value={billData.totalAmount}
                  onChange={handleChange('totalAmount')}
                  placeholder="Enter total amount"
                  required
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex space-x-3 pt-4"
                >
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAttemptBack}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                  >
                    Submit Bill
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </div>

        <AnimatePresence>
          {showSaveDraftModal && (
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save as Draft?</h3>
                <p className="text-gray-600 mb-6">Do you want to save this bill as a draft to continue later?</p>
                <div className="flex flex-col space-y-3">
                  <Button variant="primary" onClick={handleSaveDraft}>Save Draft</Button>
                  <Button variant="danger" onClick={handleDiscard}>Discard</Button>
                  <Button variant="secondary" onClick={() => setShowSaveDraftModal(false)}>Cancel</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar title="Submit Bill" onBack={onBack} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 mb-6">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-semibold text-gray-900 mb-6 text-center"
            >
              Upload Receipt
            </motion.h3>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => handleFileUpload('camera')}
                  className="w-full flex items-center justify-center"
                >
                  <Camera size={20} className="mr-2" />
                  Take Photo
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="secondary"
                  onClick={() => handleFileUpload('gallery')}
                  className="w-full flex items-center justify-center"
                >
                  <Upload size={20} className="mr-2" />
                  Choose from Gallery
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 px-2">Drafts</h3>
          <div className="space-y-3">
            {drafts.length > 0 ? drafts.map((draft, index) => (
              <motion.div
                key={draft.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card padding="p-3" className="hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <img src={draft.image} alt="Draft" className="w-16 h-16 rounded-lg object-cover mr-4" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{draft.vendorName}</p>
                      <p className="text-sm text-gray-500">{draft.date}</p>
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => handleContinueDraft(draft)}>Continue</Button>
                  </div>
                </Card>
              </motion.div>
            )) : (
              <p className="text-center text-gray-500 py-4">No saved drafts.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitBillScreen;
