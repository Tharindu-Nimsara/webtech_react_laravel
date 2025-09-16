import React, { useState } from 'react';

const Upload_1 = ({ onNext, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    description: initialData.description || '',
    department: initialData.department || '',
    year: initialData.year || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    { value: '', label: 'Select your department' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'information-systems', label: 'Information Systems' },
    { value: 'information-technology', label: 'Information Technology' },
    { value: 'data-science', label: 'Data Science' }
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Project category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Project year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call or processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form data:', formData);
      
      // Call onNext prop if provided (for multi-step form)
      if (onNext) {
        onNext(formData);
      } else {
        // Handle single-step submission
        alert('Project information saved successfully!');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save project information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Project
          </h1>
          <p className="text-gray-600 text-lg">
            Share your academic work with the university community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Card Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Project Information</h2>
            <p className="text-gray-600 text-sm mt-1">
              Provide basic details about your project
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Title and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-blue-600 mb-2">
                    Project Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your project title"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.title 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Project Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-blue-600 mb-2">
                    Project Category<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Category of your project"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.category 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-blue-600 mb-2">
                  Project Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project, its objectives, methodology and key findings..."
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                    errors.description 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.description ? (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Minimum 50 characters ({formData.description.length}/50)
                    </p>
                  )}
                </div>
              </div>

              {/* Department and Year Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-blue-600 mb-2">
                    Department<span className="text-red-500">*</span>
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
                    required
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-blue-600 mb-2">
                    Year<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Year of your project"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.year 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                  />
                  {errors.year && (
                    <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    onNext ? 'Continue to Next Step' : 'Save Project Information'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload_1;