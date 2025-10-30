import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import TopBar from '../components/TopBar';
import ProgressBar from '../components/ProgressBar';
import { Wallet, TrendingDown, PiggyBank, Package, Utensils, Briefcase, Infinity, CircleDollarSign, Repeat } from 'lucide-react';

const BudgetOverviewScreen = ({ onBack }) => {
  const budgetDetails = {
    'Travel': {
      icon: Briefcase,
      allocated: 50000,
      unlimited: false,
      spent: 28500.75,
      lastMonthCarryForward: 4500.25,
      carryForwardEnabled: true,
      unlimitedCarryForward: false,
      maxCarryForward: 10000,
    },
    'Food': {
      icon: Utensils,
      allocated: 20000,
      unlimited: false,
      spent: 21500.50, // Over budget example
      lastMonthCarryForward: 1500.00,
      carryForwardEnabled: false,
      unlimitedCarryForward: false,
      maxCarryForward: '',
    },
    'Office Supplies': {
      icon: Package,
      allocated: null,
      unlimited: true,
      spent: 7800.00,
      lastMonthCarryForward: 0,
    },
    'Miscellaneous': {
      icon: Wallet,
      allocated: 3000,
      unlimited: false,
      spent: 1200.00,
      lastMonthCarryForward: 0,
      carryForwardEnabled: true,
      unlimitedCarryForward: true,
      maxCarryForward: '',
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <TopBar title="Budget Overview" onBack={onBack} />
      
      <div className="max-w-mobile mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {Object.entries(budgetDetails).map(([category, details]) => {
            const Icon = details.icon;
            const totalAvailable = details.unlimited ? Infinity : details.allocated + details.lastMonthCarryForward;
            const remaining = details.unlimited ? Infinity : totalAvailable - details.spent;
            const isOverBudget = !details.unlimited && remaining < 0;

            return (
              <motion.div key={category} variants={itemVariants}>
                <Card className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{category}</h3>
                  </div>

                  {details.unlimited ? (
                    <div className="text-center py-8">
                      <Infinity size={32} className="text-primary mx-auto mb-2" />
                      <p className="font-bold text-xl text-primary">Unlimited Budget</p>
                      <p className="text-sm text-gray-600">Spent so far: ₹{details.spent.toLocaleString('en-IN')}</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Remaining Balance</p>
                        <p className={`text-3xl font-bold ${isOverBudget ? 'text-red-500' : 'text-gray-900'}`}>
                          {isOverBudget && '-'}{'₹'}{Math.abs(remaining).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      
                      <ProgressBar value={details.spent} max={totalAvailable} />

                      <div className="border-t border-gray-200 mt-4 pt-4 space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center text-gray-600"><Repeat size={14} className="mr-2"/> Carry Forward</span>
                          {details.carryForwardEnabled ? (
                            details.unlimitedCarryForward ? (
                                <span className="font-medium text-green-600">Unlimited</span>
                            ) : (
                                <span className="font-medium text-gray-800">Max: ₹{details.maxCarryForward.toLocaleString('en-IN')}</span>
                            )
                          ) : (
                            <span className="font-medium text-gray-500">Disabled</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BudgetOverviewScreen;
