import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ProfileEdit = ({ userId }) => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    bio: '',
    skills: '',
    github: '',
    website: '',
    phone: '',
    location: '',
    yearOfStudy: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Sample user data (replace with API call)
  const sampleUserData = {
    bio: 'Passionate student focused on academic excellence and innovative projects.',
    skills: 'ML, Fullstack development, UI design',
    github: 'https://github.com/Tharindu-Nimsara',
    website: 'website.com',
    phone: '070 2287 863',
    location: 'Kegalle, Srilanka',
    yearOfStudy: '2nd Year'
  };

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
    // Load current user data
    const loadUserData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setFormData(sampleUserData);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [userId]);

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
    if (formData.github && !isValidUrl(formData.github)) {
      newErrors.github = 'Please enter a valid GitHub URL';
    }

    if (formData.website && !isValidUrl(formData.website) && !isValidDomain(formData.website)) {
      newErrors.website = 'Please enter a valid website URL or domain';
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
      new URL(string);
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
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'profilePicture') {
          submitData.append(key, formData[key]);
        }
      });

      // Add image if selected
      if (selectedFile) {
        submitData.append('profilePicture', selectedFile);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Profile updated successfully:', formData);
      alert('Profile updated successfully!');
      
      // Redirect to profile page or show success message
      // window.location.href = '/profile';
      
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Profile update failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Edit Profile</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
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
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub:
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/Tharindu-Nimsara"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.github ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.github && (
                <p className="mt-1 text-sm text-red-600">{errors.github}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Website:
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="website.com or https://yourwebsite.com"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.website ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website}</p>
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
              <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-2">
                Year of Study:
              </label>
              <select
                id="yearOfStudy"
                name="yearOfStudy"
                value={formData.yearOfStudy}
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
                onClick={handleSubmit}
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
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ProfileEdit;