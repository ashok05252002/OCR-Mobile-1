import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm mx-auto w-full"
      >
        <div className="text-center mb-8">
          <img 
            src="https://www.iproat.com/wp-content/uploads/2025/01/cropped-iProAT-Solutions-Black-180x60.png" 
            alt="iProAT Solutions" 
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('forgot-password')}
            className="text-primary hover:text-primaryDark text-sm"
          >
            Forgot your password?
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-primary hover:text-primaryDark font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
