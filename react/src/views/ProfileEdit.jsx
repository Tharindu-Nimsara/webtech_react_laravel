import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { updateProfile } from '../services/authService.js'; 
import axiosClient from '../services/axios-client.js';

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    bio: '',
    skills: '',
    github_url: '', // Changed from 'github' to match backend
    website_url: '', // Changed from 'website' to match backend
    phone: '',
    location: '',
    year_of_study: '' // Changed from 'yearOfStudy' to match backend
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const yearOptions = [
    { value: '', label: 'Select Year' },
    { value: '1st Year', label: '1st Year' },
    { value: '2nd Year', label: '2nd Year' },
    { value: '3rd Year', label: '3rd Year' },
    { value: '4th Year', label: '4th Year' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Postgraduate', label: 'Postgraduate' }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
          const result = await axiosClient.get('/auth/me');
          if (result.data.success) {
            const userData = result.data.user;
            setFormData({
              bio: userData.bio || '',
              skills: userData.skills || '',
              github_url: userData.github_url || '', // Fixed field name
              website_url: userData.website_url || '', // Fixed field name
              phone: userData.phone || '',
              location: userData.location || '',
              year_of_study: userData.year_of_study || '' // Fixed field name
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImageFile(file)) {
        setSelectedFile(file);
        setFormData(prev => ({
          ...prev,
          profilePicture: file
        }));
      }
    }
  };

  const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, profilePicture: 'Please select a JPG, JPEG, or PNG file.' }));
      return false;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, profilePicture: 'File size must be less than 5MB.' }));
      return false;
    }

    setErrors(prev => ({ ...prev, profilePicture: '' }));
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    // URL validations
    if (formData.github_url && !isValidUrl(formData.github_url)) {
      newErrors.github_url = 'Please enter a valid GitHub URL';
    }

    if (formData.website_url && !isValidUrl(formData.website_url) && !isValidDomain(formData.website_url)) {
      newErrors.website_url = 'Please enter a valid website URL or domain';
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      // Handle cases where user enters domain without protocol
      const urlToTest = string.startsWith('http://') || string.startsWith('https://') 
        ? string 
        : `https://${string}`;
      new URL(urlToTest);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const isValidDomain = (string) => {
    // Simple domain validation (allows domain.com format)
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,})+$/;
    return domainRegex.test(string);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted'); // Debug log
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add Laravel method spoofing for PUT request with FormData
      submitData.append('_method', 'PUT');
      
      // Add form fields with correct backend field names (matching controller expectations)
      if (formData.bio) submitData.append('bio', formData.bio);
      if (formData.skills) submitData.append('skills', formData.skills);
      if (formData.github_url) submitData.append('github', formData.github_url); // Controller expects 'github'
      if (formData.website_url) submitData.append('website', formData.website_url); // Controller expects 'website'
      if (formData.phone) submitData.append('phone', formData.phone);
      if (formData.location) submitData.append('location', formData.location);
      if (formData.year_of_study) submitData.append('yearOfStudy', formData.year_of_study); // Controller expects 'yearOfStudy'

      // Add image if selected
      if (selectedFile) {
        submitData.append('profilePicture', selectedFile); // Controller expects 'profilePicture'
      }

      console.log('Submitting data:', Object.fromEntries(submitData.entries())); // Debug log

      // Call API
      const result = await updateProfile(submitData);
      
      console.log('API Response:', result); // Debug log to see what we get back
      console.log('API Response type:', typeof result); // Check if it's an object
      console.log('API Response keys:', result ? Object.keys(result) : 'null/undefined'); // See what properties it has
      
      // Handle different response structures
      if (result && result.success) {
        alert('Profile updated successfully!');
        // Optionally redirect to profile page
        window.location.href = '/profile';
      } else if (result && result.data && result.data.success) {
        // Handle case where success is nested in data
        alert('Profile updated successfully!');
        window.location.href = '/profile';
      } else {
        // Handle error cases
        const errorMessage = result?.error || result?.message || result?.data?.error || 'Unknown error occurred';
        alert('Profile update failed: ' + errorMessage);
        console.error('Update failed with result:', result);
      }
      
    } catch (error) {
      console.error('Profile update failed:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        
        // Try to get a meaningful error message
        const errorMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            `HTTP ${error.response.status}: ${error.response.statusText}`;
        alert('Profile update failed: ' + errorMessage);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('Profile update failed: No response from server. Please check your connection.');
      } else {
        console.error('Error setting up request:', error.message);
        alert('Profile update failed: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-blue-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Edit Profile</h1>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture:
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  />
                </div>
                {selectedFile && (
                  <p className="mt-1 text-sm text-green-600">
                    Selected: {selectedFile.name}
                  </p>
                )}
                {errors.profilePicture && (
                  <p className="mt-1 text-sm text-red-600">{errors.profilePicture}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio:
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                />
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma separated):
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="ML, Fullstack development, UI design"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* GitHub */}
              <div>
                <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub:
                </label>
                <input
                  type="url"
                  id="github_url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  placeholder="https://github.com/Tharindu-Nimsara"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.github_url ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.github_url && (
                  <p className="mt-1 text-sm text-red-600">{errors.github_url}</p>
                )}
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website:
                </label>
                <input
                  type="text"
                  id="website_url"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleInputChange}
                  placeholder="website.com or https://yourwebsite.com"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.website_url ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.website_url && (
                  <p className="mt-1 text-sm text-red-600">{errors.website_url}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="070 2287 863"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Kegalle, Srilanka"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Year of Study */}
              <div>
                <label htmlFor="year_of_study" className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Study:
                </label>
                <select
                  id="year_of_study"
                  name="year_of_study"
                  value={formData.year_of_study}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {yearOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving Changes...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileEdit;