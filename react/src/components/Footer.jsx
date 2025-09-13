import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-15 h-15 bg-gradient-to-br  rounded-full flex items-center justify-center  shadow-md">
                
                <img src="../../usj-logo.png" ></img>

              </div>
              <div>
                <h3 className="text-lg font-bold">USJ Student Projects</h3>
                <p className="text-sm text-gray-400">University of Sri Jayewardenepura</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A platform for students to showcase their academic projects and connect with the university community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/projects" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Browse Projects
                </a>
              </li>
              <li>
                <a 
                  href="/upload" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Upload Project
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/help" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="/guidelines" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Guidelines
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 University of Sri Jayewardenepura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;