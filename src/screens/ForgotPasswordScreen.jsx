import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { Mail, Phone } from 'lucide-react';

const ForgotPasswordScreen = ({ onNavigate, onBack }) => {
  const [resetMethod, setResetMethod] = useState('email');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending OTP
    alert('OTP sent successfully!');
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar title="Reset Password" onBack={onBack} />
      <div className="flex-grow flex flex-col justify-center px-6 py-12">
        <div className="max-w-sm mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <p className="text-gray-600">Choose how you'd like to reset your password</p>
            </div>

            <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setResetMethod('email')}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                  resetMethod === 'email' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <Mail size={16} className="mr-2" />
                Email
              </button>
              <button
                onClick={() => setResetMethod('mobile')}
                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${
                  resetMethod === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <Phone size={16} className="mr-2" />
                Mobile
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {resetMethod === 'email' ? (
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="Enter your email"
                  required
                />
              ) : (
                <Input
                  label="Mobile Number"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange('mobile')}
                  placeholder="Enter your mobile number"
                  required
                />
              )}

              <Button type="submit" className="w-full">
                Send OTP
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Remember your password?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-primary hover:text-primaryDark font-medium"
                >
                  Login
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
