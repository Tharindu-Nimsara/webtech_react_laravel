import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  // Sample projects data (replace with API call)
  const sampleProjects = [
    {
      id: 1,
      title: "Robot car",
      category: "Arduino",
      department: "software-engineering",
      year: "2025",
      description: "Designed and built an autonomous robot car capable of obstacle detection and smart navigation.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["Arduino"],
      author: "Lisara Hansali",
      authorDetails: "2025, software-engineering"
    },
    {
      id: 2,
      title: "E-Commerce Web Application",
      category: "Web Development",
      department: "software-engineering",
      year: "2025",
      description: "A responsive e-commerce web application offering a seamless and feature-rich shopping experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["E-commerce", "Web Development"],
      author: "Lisara Hansali",
      authorDetails: "2025, software-engineering"
    },
    {
      id: 3,
      title: "Responsive Weather App",
      category: "Web App",
      department: "computer-science",
      year: "2024",
      description: "Developed an interactive weather application using HTML, CSS, and JavaScript, integrating a weather API to provide real-time updates. The app features...",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["Web App", "Weather App"],
      author: "Tharindu Nimsara",
      authorDetails: "2024, computer-science"
    },
    {
      id: 4,
      title: "Machine Learning Model",
      category: "AI/ML",
      department: "computer-science",
      year: "2024",
      description: "Built a machine learning model for predicting student performance using various algorithms.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["Machine Learning", "Python", "AI"],
      author: "John Doe",
      authorDetails: "2024, computer-science"
    },
    {
      id: 5,
      title: "Mobile Banking App",
      category: "Mobile Development",
      department: "software-engineering",
      year: "2025",
      description: "A secure mobile banking application with modern UI/UX design and robust security features.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      tags: ["Mobile App", "Banking", "Security"],
      author: "Jane Smith",
      authorDetails: "2025, software-engineering"
    }
  ];

  // Department options
  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'information-systems', label: 'Information Systems' },
    { value: 'information-technology', label: 'Information Technology' }
  ];

  // Year options
  const years = [
    { value: '', label: 'All Years' },
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  // Tag options
  const tagOptions = [
    { value: '', label: 'All Tags' },
    { value: 'arduino', label: 'Arduino' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'ai', label: 'AI' }
  ];

  // Load projects (replace with API call)
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setIsLoading(false);
    };

    loadProjects();
  }, []);

// API Integration:
// Replace the sampleProjects data and loadProjects function with actual API calls to your Laravel backend:  

// const loadProjects = async () => {
//   setIsLoading(true);
//   try {
//     const response = await fetch('/api/projects');
//     const data = await response.json();
//     setProjects(data);
//     setFilteredProjects(data);
//   } catch (error) {
//     console.error('Error loading projects:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };


  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !filters.search || 
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.author.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesDepartment = !filters.department || project.department === filters.department;
      const matchesYear = !filters.year || project.year === filters.year;
      const matchesTags = !filters.tags || 
        project.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase()));

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

  return (
    <>
    <Header></Header>
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
                Search projects, authors or keywords...
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

        {/* Projects Grid */}
        {!isLoading && (
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
                  Try adjusting your search criteria or filters to find more projects.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Projects;