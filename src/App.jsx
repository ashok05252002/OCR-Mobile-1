import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import SubmitBillScreen from './screens/SubmitBillScreen';
import ApproveScreen from './screens/ApproveScreen';
import ProfileScreen from './screens/ProfileScreen';
import BillDetailScreen from './screens/BillDetailScreen';
import HistoryScreen from './screens/HistoryScreen';
import ConfigScreen from './screens/ConfigScreen';
import BudgetOverviewScreen from './screens/BudgetOverviewScreen';
import NotificationConfigScreen from './screens/NotificationConfigScreen';
import ExpenseConfigScreen from './screens/ExpenseConfigScreen';
import RejectionPolicyScreen from './screens/RejectionPolicyScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBill, setSelectedBill] = useState(null);
  const [historyStack, setHistoryStack] = useState(['login']);

  const handleNavigate = (screen, data = null) => {
    setHistoryStack(prev => [...prev, screen]);
    setCurrentScreen(screen);
    if (data) {
      setSelectedBill(data);
    }
    const mainTabs = ['dashboard', 'approve', 'history', 'config'];
    if (mainTabs.includes(screen)) {
      setActiveTab(screen);
    }
  };

  const handleBack = () => {
    const newStack = [...historyStack];
    newStack.pop();
    const previousScreen = newStack[newStack.length - 1] || 'login';
    setHistoryStack(newStack);
    setCurrentScreen(previousScreen);

    const mainTabs = ['dashboard', 'approve', 'history', 'config'];
    if (mainTabs.includes(previousScreen)) {
      setActiveTab(previousScreen);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    handleNavigate(tab);
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'dashboard':
        return <DashboardScreen activeTab={activeTab} onTabChange={handleTabChange} onNavigate={handleNavigate} />;
      case 'submit-bill':
        return <SubmitBillScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'approve':
        return <ApproveScreen activeTab={activeTab} onTabChange={handleTabChange} onNavigate={handleNavigate} />;
      case 'history':
        return <HistoryScreen activeTab={activeTab} onTabChange={handleTabChange} onNavigate={handleNavigate} />;
      case 'config':
        return <ConfigScreen activeTab={activeTab} onTabChange={handleTabChange} onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'bill-detail':
        return <BillDetailScreen bill={selectedBill} onNavigate={handleNavigate} onBack={handleBack} />;
      case 'budget-overview':
        return <BudgetOverviewScreen onBack={handleBack} />;
      case 'notification-config':
        return <NotificationConfigScreen onBack={handleBack} />;
      case 'expense-config':
        return <ExpenseConfigScreen onBack={handleBack} />;
      case 'rejection-policy':
        return <RejectionPolicyScreen onBack={handleBack} />;
      default:
        return <LoginScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-w-mobile max-w-mobile mx-auto bg-white min-h-screen">
      {renderScreen()}
    </div>
  );
}

export default App;
