import React from 'react';

const Home3rdSection = () => {
  const steps = [
    {
      number: "1",
      title: "Upload Your Project",
      description: "Share your project details, documentation, and media files through our easy-to-use upload form.",
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      number: "2",
      title: "Get Reviewed",
      description: "Faculty members and peers review your project for quality, innovation, and academic excellence.",
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "3",
      title: "Get Featured",
      description: "Outstanding projects get featured on the homepage and shared with the entire university community.",
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
        </svg>
      )
    }
  ];

  const achievements = [
    {
      number: "500+",
      label: "Projects Uploaded"
    },
    {
      number: "50+",
      label: "Awards Won"
    },
    {
      number: "1000+",
      label: "Student Views"
    },
    {
      number: "95%",
      label: "Satisfaction Rate"
    }
  ];

  return (
    <div>
      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Simple steps to showcase your academic projects and connect with the university community
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Step Number and Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <span className="text-blue-600">{step.number}. </span>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main CTA Content */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Showcase Your Work?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of students who have already shared their innovative projects. 
              Get recognition, connect with peers, and inspire the next generation of innovators.
            </p>

            {/* Upload Button */}
            <a 
              href="/upload"
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Upload Your Project</span>
            </a>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-blue-400">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-blue-100 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home3rdSection;