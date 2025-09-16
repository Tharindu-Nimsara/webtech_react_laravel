import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { uploadProject } from '../services/authService.js';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    department: '',
    year: '',
    tags: '',
    abstract: '',
    githubUrl: '',
    liveUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    { value: '', label: 'Select your department' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Information Systems', label: 'Information Systems' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Data Science', label: 'Data Science' }
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateImageFile(file)) {
        setSelectedImage(file);
      }
    }
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateImageFile(file)) {
        setSelectedImage(file);
      }
    }
  };

  const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Please select a JPG, JPEG, or PNG file.' }));
      return false;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, image: 'File size must be less than 10MB.' }));
      return false;
    }

    // Clear image error if file is valid
    setErrors(prev => ({ ...prev, image: '' }));
    return true;
  };

  const removeImage = () => {
    setSelectedImage(null);
    setErrors(prev => ({ ...prev, image: '' }));
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
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Please select your department';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Project year is required';
    }

    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }

    if (formData.liveUrl && !isValidUrl(formData.liveUrl)) {
      newErrors.liveUrl = 'Please enter a valid demo URL';
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
      
      // Add form fields
      submitData.append('title', formData.title);
      submitData.append('category', formData.category);
      submitData.append('description', formData.description);
      submitData.append('department', formData.department);
      submitData.append('year', formData.year);
      
      // Add optional fields only if they have values
      if (formData.tags) submitData.append('tags', formData.tags);
      if (formData.abstract) submitData.append('abstract', formData.abstract);
      if (formData.githubUrl) submitData.append('githubUrl', formData.githubUrl);
      if (formData.liveUrl) submitData.append('liveUrl', formData.liveUrl);

      // Add image if selected
      if (selectedImage) {
        submitData.append('image', selectedImage);
      }

      console.log('Submitting data:', Object.fromEntries(submitData.entries())); // Debug log

      // Call real API
      const result = await uploadProject(submitData);
      
      console.log('API Response:', result); // Debug log
      
      if (result.success) {
        alert('Project uploaded successfully!');
        
        // Reset form
        setFormData({
          title: '',
          category: '',
          description: '',
          department: '',
          year: '',
          tags: '',
          abstract: '',
          githubUrl: '',
          liveUrl: ''
        });
        setSelectedImage(null);
        
        // Optionally redirect to projects page or profile
        window.location.href = '/projects';
      } else {
        alert('Project upload failed: ' + (result.error || 'Unknown error'));
      }
      
    } catch (error) {
      console.error('Project upload failed:', error);
      alert('Project upload failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Information Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Project Information</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Provide basic details about your project
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Project Title and Category Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required
                      />
                      {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

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
                          errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required
                      />
                      {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
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
                        errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      required
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.description ? (
                        <p className="text-sm text-red-600">{errors.description}</p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Minimum 10 characters 
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Department and Year Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required
                      >
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                      {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                    </div>

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
                        placeholder="Year of your project (e.g., 2024)"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.year ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required
                      />
                      {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Image Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Project Image</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Upload a representative image for your project (optional)
                </p>
              </div>

              <div className="p-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : selectedImage
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedImage ? (
                    <div>
                      <div className="text-green-600 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-green-700 font-medium mb-2">{selectedImage.name}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">Click to upload project image</p>
                      <p className="text-gray-600 text-sm mb-2">
                        Drag and drop an image here, or click to browse
                      </p>
                      <p className="text-gray-400 text-xs">
                        Supported formats: JPG, JPEG, PNG (Max 10MB)
                      </p>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer inline-block transition-colors"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Tags</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Add relevant tags to help others discover your project
                </p>
              </div>

              <div className="p-6">
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-900 mb-2">
                    Enter tags (comma separated):
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g. AI, Machine Learning, IoT"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Additional Information</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Optional details about your project
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Project Abstract */}
                <div>
                  <label htmlFor="abstract" className="block text-sm font-medium text-blue-600 mb-2">
                    Project Abstract
                  </label>
                  <textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your project (optional)"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors resize-vertical"
                  />
                </div>

                {/* GitHub Repository and Live Demo URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="githubUrl" className="block text-sm font-medium text-blue-600 mb-2">
                      GitHub Repository
                    </label>
                    <input
                      type="url"
                      id="githubUrl"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.githubUrl ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.githubUrl && <p className="mt-1 text-sm text-red-600">{errors.githubUrl}</p>}
                  </div>

                  <div>
                    <label htmlFor="liveUrl" className="block text-sm font-medium text-blue-600 mb-2">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      id="liveUrl"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleInputChange}
                      placeholder="https://your-project-demo.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.liveUrl ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                    {errors.liveUrl && <p className="mt-1 text-sm text-red-600">{errors.liveUrl}</p>}
                  </div>
                </div>

                {/* Submit Button */}
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
                        <span>Uploading Project...</span>
                      </div>
                    ) : (
                      'Upload Project'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Upload;