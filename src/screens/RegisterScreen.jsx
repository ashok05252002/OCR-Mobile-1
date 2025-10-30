import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';
import { Receipt } from 'lucide-react';
import TopBar from '../components/TopBar';

const RegisterScreen = ({ onNavigate, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    onNavigate('login');
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBar title="Create Account" onBack={onBack} />
      <div className="flex-grow flex flex-col justify-center px-6 py-12">
        <div className="max-w-sm mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                <Receipt size={32} className="text-white" />
              </div>
              <p className="text-gray-600">Join us to manage your bills</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                placeholder="Enter your full name"
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="Enter your email"
                required
              />

              <Input
                label="Mobile Number"
                type="tel"
                value={formData.mobile}
                onChange={handleChange('mobile')}
                placeholder="Enter your mobile number"
                required
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                placeholder="Create a password"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="Confirm your password"
                required
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
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

export default RegisterScreen;
