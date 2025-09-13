import React from 'react';


// ProjectCard Props Structure:

// const project = {
//   id: 1,
//   title: "Project Title",
//   category: "Arduino/Web Development/etc",
//   department: "Software Engineering",
//   year: "2025",
//   description: "Project description...",
//   image: "image-url",
//   tags: ["tag1", "tag2"],
//   author: "Author Name",
//   authorDetails: "2nd Year, Department"
// };

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    category,
    department,
    year,
    description,
    image,
    tags = [],
    author,
    authorDetails
  } = project;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Project Image with Category Overlay */}
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-blue-600 bg-opacity-90 flex flex-col justify-between p-4">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{category}</h3>
            <p className="text-blue-100 text-sm">{department}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        {/* Year and Department Badge */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {year}
          </span>
          <span className="text-gray-500 text-sm">{department}</span>
        </div>

        {/* Project Title */}
        <h4 className="text-lg font-bold text-gray-900 mb-3">{title}</h4>

        {/* Project Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Info and View Details */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{author}</span>
            {authorDetails && (
              <div className="text-xs text-gray-500">
                {authorDetails}
              </div>
            )}
          </div>
          <a 
            href={`/projects/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1 transition-colors"
          >
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

