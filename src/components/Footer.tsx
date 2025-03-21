
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 hover:scale-105 transition-transform duration-300">
            <img
              src="/lovable-uploads/f43f82f7-7d13-4e58-8f7e-70aca1c5b98a.png"
              alt="NMIET Logo"
              className="h-10 w-auto"
            />
            <span className="text-sm text-white font-medium">NMIET Mock Test Platform</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-white">
              &copy; {currentYear} Nutan Maharashtra Institute of Engineering and Technology. All rights reserved.
            </p>
            <p className="text-xs text-yellow-200 mt-1 hover:text-yellow-300 transition-colors">
              <span>AICTE Approved / NAAC Accredited / SPPU Affiliated</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
