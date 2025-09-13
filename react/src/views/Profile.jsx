import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Projects');

  // Sample user data (replace with API call)
  const sampleUser = {
    id: 1,
    name: "Tharindu Nimsara",
    email: "tharinduonline1080@gmail.com",
    phone: "070 2287 863",
    githubUrl: "https://github.com/Tharindu-Nimsara",
    websiteUrl: "website.com",
    location: "Kegalle, Srilanka",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    bio: "Passionate student focused on academic excellence and innovative projects.",
    degree: "BSc (Hons) Computer Science",
    year: "2nd Year",
    skills: ["ML", "Full-stack development", "UI design"],
    projectCount: 3
  };

  const sampleProjects = [
    {
      id: 1,
      title: "Responsive Weather App",
      description: "Developed an interactive weather application using HTML, CSS, and JavaScript, integrating a weather...",
      tags: ["Web App", "Weather App"],
      year: "2024"
    },
    {
      id: 2,
      title: "Flutter ToDo App",
      description: "A simple yet functional task management app built using Flutter. It allows users to add, mark comple...",
      tags: ["Mobile App", "Flutter"],
      year: "2025"
    },
    {
      id: 3,
      title: "Machine Learning Sentiment Analysis Project",
      description: "Excited to share my latest Machine Learning project – a Sentiment Analysis Web Application that clas...",
      tags: ["AI", "Machine Learning"],
      year: "2024"
    }
  ];

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(sampleUser);
        setUserProjects(sampleProjects);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600">The user profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Sidebar - User Information */}
            <div className="lg:col-span-1 bg-gray-50 p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800">
                      {user.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{user.phone}</span>
                  </div>

                  {user.githubUrl && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        {user.githubUrl.replace('https://github.com/', '')}
                      </a>
                    </div>
                  )}

                  {user.websiteUrl && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <a href={`https://${user.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        {user.websiteUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span>{user.degree}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{user.year}</span>
                  </div>
                </div>
              </div>

              {/* Skills & Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Profile and Projects */}
            <div className="lg:col-span-2 p-6">
              {/* Profile Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    {user.location && (
                      <div className="flex items-center text-gray-600 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <a 
                  href="/profile/edit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit Profile
                </a>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <p className="text-gray-700">{user.bio}</p>
              </div>

              {/* Projects Counter */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">{user.projectCount}</div>
                <div className="text-gray-600 text-sm">PROJECTS</div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex justify-center">
                  <button
                    onClick={() => setActiveTab('Projects')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'Projects'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Projects
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map(project => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">{project.year}</span>
                      <a 
                        href={`/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                ))}
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

export default Profile;