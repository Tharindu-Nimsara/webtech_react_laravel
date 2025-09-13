import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const About = () => {
  const stats = [
    {
      number: "5",
      label: "Total Projects"
    },
    {
      number: "2",
      label: "Active Students"
    },
    {
      number: "2",
      label: "Departments"
    },
    {
      number: "5",
      label: "This Month"
    }
  ];

  const universityStats = [
    {
      number: "15,000+",
      label: "Students"
    },
    {
      number: "1,200+",
      label: "Faculty Members"
    },
    {
      number: "65+",
      label: "Years of Excellence"
    },
    {
      number: "11",
      label: "Faculties"
    }
  ];

  const pillars = [
    {
      title: "Innovation Hub",
      description: "Showcasing cutting-edge projects that push the boundaries of technology and research."
    },
    {
      title: "Collaboration",
      description: "Fostering partnerships between students, faculty, industry, and research institutions."
    },
    {
      title: "Global Impact",
      description: "Creating solutions that addresses social challenges and contribute to sustainable development."
    }
  ];

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-blue-50">
      {/* First Section - About Our Student Project Showcase */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Student Project Showcase</h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Empowering innovation and academic excellence through a platform that 
              celebrates student creativity, research, and technological advancement.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Section - University Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">University of Sri Jayewardenepura</h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Established in 1958, the University of Sri Jayewardenepura stands 
                as one of Sri Lanka's premier institutions of higher education. 
                Located in Nugegoda, our university has been at the forefront of 
                academic excellence, research innovation, and student 
                development for over five decades.
              </p>

              <p className="text-gray-700 mb-8 leading-relaxed">
                With a diverse community of students and dedicated faculty 
                members, we offer comprehensive programs across multiple 
                faculties including Applied Sciences, Management Studies, 
                Medical Sciences, Humanities and Graduate Studies.
              </p>

              {/* University Stats */}
              <div className="grid grid-cols-2 gap-6">
                {universityStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* University Logo */}
            <div className="flex justify-center">
              <div className="w-100 h-100 bg-gradient-to-br  rounded-full flex items-center justify-center ">
                
                <img src="../../usj-logo.png" ></img>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Driving innovation and excellence in education, research, and community service.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Develop globally competent citizens through our education for a sustainable 
                future, drawing inspirations from our cultural heritage and wisdom
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                Prosper lives through Education.
              </p>
            </div>
          </div>

          {/* About the Project Showcase */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Project Showcase</h2>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
              Our Student Project Showcase is a comprehensive platform that highlights the exceptional work of 
              our students across all departments, demonstrating their ability to tackle real-world challenges through 
              research, technology and innovative thinking.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-700 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Join Our Innovation Community</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Whether you're a student, faculty member, or industry partner, we welcome you to be part of our ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/upload"
                className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Upload Your Project
              </a>
              <a 
                href="/projects"
                className="border border-white text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - Get in Touch */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg">
              Have questions about the showcase or want to get involved? Reac Out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visit Us */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Visit Us</h3>
              <div className="text-gray-700 space-y-1">
                <p>University of Sri</p>
                <p>Jayewardenepura, Gangodawila,</p>
                <p>Nugegoda, Sri Lanka</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Call Us</h3>
              <div className="text-gray-700 space-y-1">
                <p>+94 11 2802026</p>
                <p>+94 11 2802027</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Email Us</h3>
              <div className="text-gray-700 space-y-1">
                <p>
                  <a href="mailto:showcase@sjp.ac.lk" className="text-blue-600 hover:text-blue-800">
                    showcase@sjp.ac.lk
                  </a>
                </p>
                <p>
                  <a href="mailto:info@sjp.ac.lk" className="text-blue-600 hover:text-blue-800">
                    info@sjp.ac.lk
                  </a>
                </p>
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

export default About;