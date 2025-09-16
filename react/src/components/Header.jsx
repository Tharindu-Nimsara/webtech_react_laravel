import React, { useState, useEffect } from 'react';
import axiosClient from '../services/axios-client.js';

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const token = localStorage.getItem('ACCESS_TOKEN');
  const isAuthenticated = !!token;

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosClient.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If token is invalid, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('ACCESS_TOKEN');
          window.location.href = '/login';
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    window.location.href = '/login';
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <header className="bg-blue-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <a href="/app" className="flex items-center space-x-3">
              <div className="w-15 h-15 bg-gradient-to-br rounded-full flex items-center justify-center">
                <img src="../../usj-logo.png" alt="USJ Logo" />
              </div>
              <div>
                <h1 className="text-blue-600 font-bold text-lg">USJ Projects</h1>
                <p className="text-xs text-gray-500">University of Sri Jayewardenepura</p>
              </div>
            </a>
          </div>

          {/* Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-12">
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="/projects" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="/upload" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
            >
              Upload
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group py-2"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Right Side - Search, Upload Button, Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors hover:bg-blue-100 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Upload Button */}
            <a 
              href="/upload" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2 text-sm shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Upload</span>
            </a>

            {isAuthenticated ? (
              <div className="relative profile-dropdown">
                {isLoading ? (
                  // Loading state
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <button 
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {user?.profile_image_url ? (
                      <img 
                        src={user.profile_image_url} 
                        alt={user.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </button>
                )}

                {/* Dropdown Menu */}
                {isProfileMenuOpen && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          {user.profile_image_url ? (
                            <img 
                              src={user.profile_image_url} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {user.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Profile button (link) */}
                    <a 
                      href="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </a>

                    {/* Edit Profile Link */}
                    <a 
                      href="/profile/edit" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </a>
                    
                    {/* Logout button */}
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;