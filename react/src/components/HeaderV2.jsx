import React from 'react';

const HeaderV2 = ({ isAuthenticated, user, onLogout }) => {
  return (
    <header className="bg-blue-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-15 h-15 bg-gradient-to-br  rounded-full flex items-center justify-center ">
                
                <img src="../../usj-logo.png" ></img>

              </div>
            <div>
              <h1 className="text-blue-600 font-bold text-lg">USJ Projects</h1>
              <p className="text-xs text-gray-500">University of Sri Jayewardenepura</p>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <a 
                  href="/profile" 
                  className="flex items-center space-x-2 hover:opacity-80"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </a>
                <button 
                  onClick={onLogout}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a 
                href="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Sign Up</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderV2;