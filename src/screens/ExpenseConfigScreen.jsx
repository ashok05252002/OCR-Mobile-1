import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';
import { Plus, Edit3, Trash2, Tag, Users, CircleDollarSign, ChevronsRight, X } from 'lucide-react';

// Reusing mock data and initial states from previous version
const mockConfigs = [
  { 
    id: 1, 
    name: 'Manager Expenses', 
    role: 'Manager', 
    categories: {
      'Travel': { enabled: true, allocation: '', unlimitedAllocation: true, carryForwardEnabled: false, unlimitedCarryForward: false, maxCarryForward: '', autoApproveEnabled: false, autoApproveAmount: '' },
      'Food': { enabled: true, allocation: '2000', unlimitedAllocation: false, carryForwardEnabled: false, unlimitedCarryForward: false, maxCarryForward: '', autoApproveEnabled: true, autoApproveAmount: '500' },
    }
  },
];
const mockRoles = ['Manager', 'Employee', 'Admin', 'Team Lead'];
const mockCategories = ['Travel', 'Food', 'Office Supplies', 'Software', 'Training', 'Miscellaneous'];
const initialCategoryState = mockCategories.reduce((acc, cat) => {
  acc[cat] = {
    enabled: false,
    allocation: '',
    unlimitedAllocation: false,
    carryForwardEnabled: false,
    unlimitedCarryForward: false,
    maxCarryForward: '',
    autoApproveEnabled: false,
    autoApproveAmount: '',
  };
  return acc;
}, {});

const ExpenseConfigScreen = ({ onBack }) => {
  const [configs, setConfigs] = useState(mockConfigs);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    configName: '',
    role: '',
    categories: initialCategoryState,
  });

  const handleCategoryUpdate = (category, field, value) => {
    setFormState(prev => {
      const newCategories = { ...prev.categories };
      const categoryState = { ...newCategories[category], [field]: value };

      if (field === 'unlimitedAllocation' && value === true) {
        categoryState.allocation = '';
        categoryState.carryForwardEnabled = false;
        categoryState.unlimitedCarryForward = false;
        categoryState.maxCarryForward = '';
        categoryState.autoApproveEnabled = false;
        categoryState.autoApproveAmount = '';
      }
      if (field === 'allocation' && value !== '') {
        categoryState.unlimitedAllocation = false;
      }
      if (field === 'unlimitedCarryForward' && value === true) {
        categoryState.maxCarryForward = '';
      }
      if (field === 'maxCarryForward' && value !== '') {
        categoryState.unlimitedCarryForward = false;
      }
      
      newCategories[category] = categoryState;
      return { ...prev, categories: newCategories };
    });
  };

  const handleSave = () => {
    // In a real app, you'd save this to a backend/state management
    console.log('Saving configuration:', formState);
    alert('Configuration saved!');
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setFormState({ configName: '', role: '', categories: initialCategoryState });
  };
  
  const getConfigDetails = (config) => {
    // Simplified helper
    const enabledCategories = Object.keys(config.categories).filter(cat => config.categories[cat].enabled);
    const totalBudgetText = '₹2,000 + Unlimited'; // Placeholder
    const carryForwardText = 'Disabled'; // Placeholder
    return { enabledCategories, totalBudgetText, carryForwardText };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Expense Policies" onBack={onBack} />

      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Existing Policies</h2>
            <p className="text-gray-600">View and manage expense policies.</p>
          </div>
          <Button size="sm" onClick={() => setShowForm(true)} className="flex items-center">
            <Plus size={16} className="mr-1" /> New
          </Button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">New Policy</h3>
                  <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                  <Input label="Policy Name" value={formState.configName} onChange={e => setFormState({...formState, configName: e.target.value})} placeholder="e.g., Q1 Marketing Budget" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select value={formState.role} onChange={e => setFormState({...formState, role: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select a role</option>
                      {mockRoles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Allocation</label>
                    <div className="space-y-3">
                      {mockCategories.map(cat => (
                        <Card key={cat} padding="p-4" className="bg-gray-50">
                          <div className="flex items-center">
                            <input type="checkbox" id={`cat-enable-${cat}`} checked={formState.categories[cat].enabled} onChange={e => handleCategoryUpdate(cat, 'enabled', e.target.checked)} className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                            <label htmlFor={`cat-enable-${cat}`} className="flex-1 ml-2 font-semibold text-gray-800">{cat}</label>
                          </div>
                          <AnimatePresence>
                          {formState.categories[cat].enabled && (
                            <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="mt-3 space-y-3 pl-1">
                              <div className="flex items-center space-x-3">
                                <Input type="number" placeholder="Amount" value={formState.categories[cat].allocation} onChange={e => handleCategoryUpdate(cat, 'allocation', e.target.value)} disabled={formState.categories[cat].unlimitedAllocation} className="mb-0 flex-1" />
                                <div className="flex items-center">
                                  <input type="checkbox" id={`unlimited-alloc-${cat}`} checked={formState.categories[cat].unlimitedAllocation} onChange={e => handleCategoryUpdate(cat, 'unlimitedAllocation', e.target.checked)} className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                                  <label htmlFor={`unlimited-alloc-${cat}`} className="ml-2 text-sm text-gray-700">Unlimited</label>
                                </div>
                              </div>
                              <AnimatePresence>
                                {!formState.categories[cat].unlimitedAllocation && (
                                  <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="space-y-3">
                                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                      <span className="text-sm font-medium">Enable Carry Forward</span>
                                      <ToggleSwitch enabled={formState.categories[cat].carryForwardEnabled} setEnabled={val => handleCategoryUpdate(cat, 'carryForwardEnabled', val)} />
                                    </div>
                                    <AnimatePresence>
                                      {formState.categories[cat].carryForwardEnabled && (
                                        <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="mt-2 space-y-2 pl-2 border-l-2 border-primary ml-2">
                                          <div className="flex items-center">
                                            <input type="checkbox" id={`unlimited-${cat}`} checked={formState.categories[cat].unlimitedCarryForward} onChange={e => handleCategoryUpdate(cat, 'unlimitedCarryForward', e.target.checked)} className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                                            <label htmlFor={`unlimited-${cat}`} className="ml-2 text-sm text-gray-700">Unlimited Carry Forward</label>
                                          </div>
                                          <Input type="number" placeholder="Max Carry Amount" value={formState.categories[cat].maxCarryForward} onChange={e => handleCategoryUpdate(cat, 'maxCarryForward', e.target.value)} disabled={formState.categories[cat].unlimitedCarryForward} className="mb-0 text-sm" />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                    <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                      <span className="text-sm font-medium">Auto-Approve</span>
                                      <ToggleSwitch enabled={formState.categories[cat].autoApproveEnabled} setEnabled={val => handleCategoryUpdate(cat, 'autoApproveEnabled', val)} />
                                    </div>
                                    <AnimatePresence>
                                      {formState.categories[cat].autoApproveEnabled && (
                                        <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="mt-2 space-y-2 pl-2 border-l-2 border-primary ml-2">
                                          <Input type="number" placeholder="Auto-approve up to" value={formState.categories[cat].autoApproveAmount} onChange={e => handleCategoryUpdate(cat, 'autoApproveAmount', e.target.value)} className="mb-0 text-sm" />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          )}
                          </AnimatePresence>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {configs.map((config, index) => {
            const { enabledCategories, totalBudgetText, carryForwardText } = getConfigDetails(config);
            return (
              <motion.div key={config.id} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: index * 0.1}}>
                <Card className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{config.name}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-2"><Users size={14} className="mr-2"/> {config.role}</div>
                      <div className="flex items-center text-sm text-gray-600 mt-1"><Tag size={14} className="mr-2"/> {enabledCategories.join(', ')}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit3 size={16} className="text-gray-600"/></button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={16} className="text-red-500"/></button>
                    </div>
                  </div>
                  <div className="border-t mt-3 pt-3 flex justify-between text-sm">
                    <div className="flex items-center text-gray-700"><CircleDollarSign size={14} className="mr-2 text-green-600"/> Budget: <span className="font-medium ml-1">{totalBudgetText}</span></div>
                    <div className="flex items-center text-gray-700"><ChevronsRight size={14} className="mr-2 text-blue-600"/> Carry: <span className="font-medium ml-1">{carryForwardText}</span></div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ ease: "easeInOut" }} className="fixed bottom-0 left-0 right-0 max-w-mobile mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-30">
            <div className="flex space-x-3">
              <Button variant="secondary" onClick={resetForm} className="flex-1">Cancel</Button>
              <Button onClick={handleSave} className="flex-1">Save Policy</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseConfigScreen;
