import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import ToggleSwitch from '../components/ToggleSwitch';
import { Users, UserCog, Trash2, Plus } from 'lucide-react';

const NotificationConfigScreen = ({ onBack }) => {
  const [managerNotifications, setManagerNotifications] = useState({
    enabled: true,
    reminders: [15, 25], // Days of the month
  });

  const [userNotifications, setUserNotifications] = useState({
    enabled: true,
    reminders: [5], // Day of the month
  });

  const handleSave = () => {
    console.log('Manager Notifications:', managerNotifications);
    console.log('User Notifications:', userNotifications);
    alert('Notification settings saved!');
    onBack();
  };

  const addReminder = (type) => {
    if (type === 'manager') {
      setManagerNotifications(prev => ({ ...prev, reminders: [...prev.reminders, ''] }));
    } else {
      setUserNotifications(prev => ({ ...prev, reminders: [...prev.reminders, ''] }));
    }
  };

  const removeReminder = (type, indexToRemove) => {
    if (type === 'manager') {
      setManagerNotifications(prev => ({ ...prev, reminders: prev.reminders.filter((_, i) => i !== indexToRemove) }));
    } else {
      setUserNotifications(prev => ({ ...prev, reminders: prev.reminders.filter((_, i) => i !== indexToRemove) }));
    }
  };

  const updateReminder = (type, index, value) => {
    const day = value === '' ? '' : Math.max(1, Math.min(31, Number(value)));
    if (type === 'manager') {
      const newReminders = [...managerNotifications.reminders];
      newReminders[index] = day;
      setManagerNotifications(prev => ({ ...prev, reminders: newReminders }));
    } else {
      const newReminders = [...userNotifications.reminders];
      newReminders[index] = day;
      setUserNotifications(prev => ({ ...prev, reminders: newReminders }));
    }
  };

  const renderReminderSection = (type, state, updateFn) => {
    const { enabled, reminders } = state;
    const title = type === 'manager' ? 'Manager Reminders' : 'User Reminders';
    const description = type === 'manager' ? 'Remind managers to approve pending bills.' : 'Remind users to submit their monthly bills.';
    const Icon = type === 'manager' ? UserCog : Users;

    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Icon size={20} className="mr-2 text-primary" />
            {title}
          </h3>
          <ToggleSwitch enabled={enabled} setEnabled={val => updateFn({ ...state, enabled: val })} />
        </div>
        <AnimatePresence>
          {enabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3">
              <p className="text-sm text-gray-600">{description}</p>
              <p className="text-xs text-gray-500">Set the day of the month for recurring reminders.</p>
              <div className="space-y-3">
                <AnimatePresence>
                  {reminders.map((day, index) => (
                    <motion.div key={index} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center space-x-2">
                      <Input type="number" value={day} onChange={(e) => updateReminder(type, index, e.target.value)} className="flex-1 mb-0" min="1" max="31" placeholder="Day"/>
                      <Button variant="secondary" size="sm" onClick={() => removeReminder(type, index)} className="p-2 h-11"><Trash2 size={16} className="text-red-500" /></Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Button variant="outline" size="sm" onClick={() => addReminder(type)} className="w-full flex items-center justify-center mt-3">
                <Plus size={16} className="mr-2" /> Add Reminder Day
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <TopBar title="Notification Settings" onBack={onBack} />
      <div className="max-w-mobile mx-auto px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {renderReminderSection('manager', managerNotifications, setManagerNotifications)}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {renderReminderSection('user', userNotifications, setUserNotifications)}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="fixed bottom-0 left-0 right-0 max-w-mobile mx-auto p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-30">
        <Button onClick={handleSave} className="w-full">Save Settings</Button>
      </motion.div>
    </div>
  );
};

export default NotificationConfigScreen;
