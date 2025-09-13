import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample project data (replace with API call)
  const sampleProject = {
    id: 1,
    title: "Machine Learning Sentiment Analysis Project",
    category: "Machine Learning",
    description: "Excited to share my latest Machine Learning project – a Sentiment Analysis Web Application that classifies user comments as either positive or negative. This is a classic binary classification problem, and I built the entire pipeline from data collection to deployment.",
    abstract: "Technologies Used: Python, Numpy, Pandas, Matplotlib, Scikit-learn, NLTK, Regular Expressions, Flask, Bootstrap This project was a great hands-on experience in building an end-to-end ML solution that combines natural language processing, model building, and web development.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["AI", "Machine Learning"],
    author: {
      name: "Tharindu Nimsara",
      email: "tharinduonline1080@gmail.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      department: "Computer Science",
      year: "2nd Year"
    },
    githubUrl: "https://github.com/username/sentiment-analysis",
    liveUrl: "https://sentiment-analysis-demo.com",
    createdAt: "2024-03-15",
    viewCount: 245
  };

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProject(sampleProject);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Project link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                {project.title}
              </h1>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Abstract Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.abstract}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Project Image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Author Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Author Information</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {project.author.profileImage ? (
                    <img
                      src={project.author.profileImage}
                      alt={project.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {project.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{project.author.name}</h4>
                  <a
                    href={`mailto:${project.author.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                  >
                    {project.author.email}
                  </a>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{project.author.department}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{project.author.year}</span>
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold">{project.viewCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="font-semibold">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold">{project.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ProjectDetails;