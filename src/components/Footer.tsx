
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 px-4 bg-gray-50 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img
              src="/lovable-uploads/f43f82f7-7d13-4e58-8f7e-70aca1c5b98a.png"
              alt="NMIET Logo"
              className="h-10 w-auto"
            />
            <span className="text-sm text-gray-600 font-medium">NMIET Mock Test Platform</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} Nutan Maharashtra Institute of Engineering and Technology. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span>AICTE Approved / NAAC Accredited / SPPU Affiliated</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
