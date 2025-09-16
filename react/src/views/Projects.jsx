import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient from '../services/axios-client.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    year: '',
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Department options
  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Software Engineering', label: 'Software Engineering' },
    { value: 'Information Systems', label: 'Information Systems' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Data Science', label: 'Data Science' }
  ];

  // Year options - dynamically generate recent years
  const currentYear = new Date().getFullYear();
  const years = [
    { value: '', label: 'All Years' },
    ...Array.from({ length: 5 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axiosClient.get('/projects');
        
        if (response.data.success) {
          // Transform the data to match the expected format
          const transformedProjects = response.data.projects.data.map(project => ({
            id: project.id,
            title: project.title,
            category: project.category,
            department: project.author.department,
            year: project.year,
            description: project.description,
            image: project.image_url || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Fallback image
            tags: Array.isArray(project.tags) ? project.tags : [],
            author: project.author.name,
            authorDetails: `${project.author.year_of_study}, ${project.author.department}`,
            view_count: project.view_count,
            created_at: project.created_at
          }));
          
          // In your Projects.jsx, add this after the data transformation
          console.log('Transformed projects:', transformedProjects);
          console.log('Sample project image URL:', transformedProjects[0]?.image);

          setProjects(transformedProjects);
          setFilteredProjects(transformedProjects);
        } else {
          throw new Error(response.data.message || 'Failed to load projects');
        }
        
      } catch (error) {
        console.error('Error loading projects:', error);
        setError(error.response?.data?.message || error.message || 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !filters.search || 
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.author.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        (Array.isArray(project.tags) && project.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase())));

      const matchesDepartment = !filters.department || project.department === filters.department;
      const matchesYear = !filters.year || project.year === filters.year;
      const matchesTags = !filters.tags || 
        (Array.isArray(project.tags) && project.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase())));

      return matchesSearch && matchesDepartment && matchesYear && matchesTags;
    });

    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      department: '',
      year: '',
      tags: ''
    });
  };

  // Extract unique tags from all projects for filter dropdown
  const getAllTags = () => {
    const allTags = projects.flatMap(project => 
      Array.isArray(project.tags) ? project.tags : []
    );
    const uniqueTags = [...new Set(allTags)].filter(tag => tag && tag.trim());
    return [
      { value: '', label: 'All Tags' },
      ...uniqueTags.map(tag => ({ value: tag, label: tag }))
    ];
  };

  const tagOptions = getAllTags();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Gallery</h1>
            <p className="text-gray-600">Explore innovative academic projects from our students</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Search */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search projects, authors or keywords..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>{dept.label}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {years.map(year => (
                    <option key={year.value} value={year.value}>{year.label}</option>
                  ))}
                </select>
              </div>

              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <select
                  value={filters.tags}
                  onChange={(e) => handleFilterChange('tags', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tagOptions.map(tag => (
                    <option key={tag.value} value={tag.value}>{tag.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(filters.search || filters.department || filters.year || filters.tags) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
            <a 
              href="/upload"
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Upload Project
            </a>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Projects</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && !error && (
            <>
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-500 mb-4">
                    {projects.length === 0 
                      ? "No projects have been uploaded yet. Be the first to share your work!"
                      : "Try adjusting your search criteria or filters to find more projects."
                    }
                  </p>
                  {projects.length === 0 ? (
                    <a 
                      href="/upload"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Upload your first project
                    </a>
                  ) : (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;