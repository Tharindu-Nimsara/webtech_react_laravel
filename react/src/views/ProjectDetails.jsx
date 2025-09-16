import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient from '../services/axios-client.js';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axiosClient.get(`/projects/${id}`);
        
        if (response.data.success) {
          setProject(response.data.project);
        } else {
          throw new Error(response.data.message || 'Project not found');
        }
        
      } catch (error) {
        console.error('Error loading project:', error);
        setError(error.response?.data?.message || error.message || 'Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProject();
    } else {
      setError('Project ID is required');
      setIsLoading(false);
    }
  }, [id]);

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/projects')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="relative">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-64 lg:h-96 object-cover"
                  onError={handleImageError}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {project.year}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {project.view_count} views
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>

                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Links */}
                <div className="mb-6 space-y-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Live Demo
                    </a>
                  )}
                </div>

                {/* Author Info */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      {project.author.profile_image_url ? (
                        <img
                          src={project.author.profile_image_url}
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
                      <h3 className="font-semibold text-gray-900">{project.author.name}</h3>
                      <p className="text-sm text-gray-600">
                        {project.author.year_of_study}, {project.author.department}
                      </p>
                      <p className="text-xs text-gray-500">{project.author.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract Section */}
            {project.abstract && (
              <div className="px-8 pb-8">
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Abstract</h2>
                  <p className="text-gray-700 leading-relaxed">{project.abstract}</p>
                </div>
              </div>
            )}

            {/* Project Metadata */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Department:</span>
                  <p className="text-gray-600">{project.author.department}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Year:</span>
                  <p className="text-gray-600">{project.year}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Published:</span>
                  <p className="text-gray-600">{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects or Actions */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-4"
            >
              Explore More Projects
            </button>
            <a
              href="/upload"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Upload Your Project
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;