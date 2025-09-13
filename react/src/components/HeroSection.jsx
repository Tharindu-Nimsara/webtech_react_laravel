import React from 'react';

const HeroSection = () => {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className="text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          University of <br></br> Sri Jayewardenepura
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-400 mb-8">
          Student Project Showcase
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover innovative academic projects, share your work, and connect with 
          fellow students. Building tomorrow's solution today.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/projects" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Explore Projects</span>
          </a>
          
          <a 
            href="/upload" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Upload Your Project</span>
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;