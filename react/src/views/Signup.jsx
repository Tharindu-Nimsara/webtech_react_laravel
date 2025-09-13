import React, { useState } from 'react';

import { signupUser } from "../services/authService";

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    yearOfStudy: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const departments = [
    'Computer Science',
    'Software Engineering',
    'Information Systems',
  ];

  const years = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear success message when user modifies form
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!formData.email.includes('@gmail.com')) {
      newErrors.email = 'Please use a valid email (@gmail.com)';
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }

    // Year validation
    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = 'Please select your year of study';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      const result = await signupUser({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        yearOfStudy: formData.yearOfStudy,
        password: formData.password
      });

      if (result.success) {
        setSuccessMessage(result.message);
        
        if (onSignup) {
          onSignup(result.data.user);
        }
        
        // Redirect to login or dashboard
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        
      } else {
        setErrors({ submit: result.error });
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-blue-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-xs">USJ</span>
                </div>
              </div>
              <div>
                <h1 className="text-blue-600 font-bold text-lg">USJ Projects</h1>
                <p className="text-xs text-gray-500">University of Sri Jayewardenepura</p>
              </div>
            </div>
            
            <a 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
              </svg>
              <span>Sign In</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                {/* Header */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                  <p className="text-gray-600 text-sm mb-6">
                    Join the USJ Projects community and showcase your work
                  </p>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-700">Student Registration</h2>
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {successMessage}
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.submit}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.name 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="your.email@gmail.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Department Field */}
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.department 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <option value="">Select your department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                    )}
                  </div>

                  {/* Year of Study Field */}
                  <div>
                    <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                      Year of Study
                    </label>
                    <select
                      id="yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.yearOfStudy 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <option value="">Select your year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {errors.yearOfStudy && (
                      <p className="mt-1 text-sm text-red-600">{errors.yearOfStudy}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Create a strong password"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.password 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Confirm your password"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                        Terms of Service
                      </a>
                      {' '}and{' '}
                      <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                      isLoading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  {/* Sign In Link */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold underline">
                        sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Join USJ Projects Section */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Why Join USJ Projects?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Showcase your academic projects to the community
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Connect with fellow students and researchers
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Get feedback and recognition for your work
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Access to project collaboration opportunities
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;