
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTestDropdownOpen, setIsTestDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTestDropdown = () => {
    setIsTestDropdownOpen(!isTestDropdownOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled ? 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-lg shadow-md py-2' : 'bg-gradient-to-r from-blue-500/70 to-purple-500/70 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center">
          {/* Logo centered at the top */}
          <div className="flex items-center justify-center w-full mb-4">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/f43f82f7-7d13-4e58-8f7e-70aca1c5b98a.png"
                alt="NMIET Logo"
                className="h-20 w-auto animate-pulse hover:animate-none transition-all duration-300"
              />
            </Link>
          </div>
          
          {/* Navigation centered below the logo */}
          <div className="hidden md:flex items-center space-x-8 py-2">
            <nav className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={cn(
                  "text-white font-medium hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 relative",
                  location.pathname === "/" && "text-yellow-300 after:absolute after:w-full after:h-0.5 after:bg-yellow-300 after:bottom-0 after:left-0"
                )}
              >
                Home
              </Link>
              
              <div className="relative group">
                <button 
                  onClick={toggleTestDropdown}
                  className={cn(
                    "flex items-center text-white font-medium hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 group-hover:text-yellow-300",
                    (location.pathname === "/test" || isTestDropdownOpen) && "text-yellow-300"
                  )}
                >
                  Tests <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                </button>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white/20 backdrop-blur-xl rounded-md shadow-xl overflow-hidden opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-300 border border-white/20">
                  <div className="py-1">
                    <Link
                      to="/test"
                      className="block px-4 py-2 text-white hover:bg-white/20 transition-colors"
                    >
                      MCA Test
                    </Link>
                    <div className="block px-4 py-2 text-gray-300 cursor-not-allowed">
                      Test 2 (Coming Soon)
                    </div>
                    <div className="block px-4 py-2 text-gray-300 cursor-not-allowed">
                      Test 3 (Coming Soon)
                    </div>
                    <div className="block px-4 py-2 text-gray-300 cursor-not-allowed">
                      Test 4 (Coming Soon)
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/admin" 
                className={cn(
                  "text-white font-medium hover:text-yellow-300 transition-all duration-300 transform hover:scale-105 relative",
                  location.pathname === "/admin" && "text-yellow-300 after:absolute after:w-full after:h-0.5 after:bg-yellow-300 after:bottom-0 after:left-0"
                )}
              >
                Admin
              </Link>
            </nav>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden absolute right-4 top-4 text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-xl shadow-md animate-slide-in">
            <div className="flex flex-col items-center py-4 px-4 space-y-4">              
              <nav className="flex flex-col items-center space-y-4 w-full">
                <Link 
                  to="/" 
                  className={cn(
                    "text-white hover:text-yellow-300 transition-colors w-full text-center py-2",
                    location.pathname === "/" && "text-yellow-300 font-medium"
                  )}
                >
                  Home
                </Link>
                
                <div className="w-full">
                  <button 
                    onClick={toggleTestDropdown}
                    className={cn(
                      "flex items-center justify-center w-full text-white hover:text-yellow-300 transition-colors py-2",
                      (location.pathname === "/test" || isTestDropdownOpen) && "text-yellow-300 font-medium"
                    )}
                  >
                    Tests <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isTestDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  
                  {isTestDropdownOpen && (
                    <div className="w-full bg-white/10 backdrop-blur-sm rounded-md my-1 animate-slide-in">
                      <div className="py-1">
                        <Link
                          to="/test"
                          className="block px-4 py-2 hover:bg-white/20 transition-colors text-center text-white"
                        >
                          MCA Test
                        </Link>
                        <div className="block px-4 py-2 text-gray-300 cursor-not-allowed text-center">
                          Test 2 (Coming Soon)
                        </div>
                        <div className="block px-4 py-2 text-gray-300 cursor-not-allowed text-center">
                          Test 3 (Coming Soon)
                        </div>
                        <div className="block px-4 py-2 text-gray-300 cursor-not-allowed text-center">
                          Test 4 (Coming Soon)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/admin" 
                  className={cn(
                    "text-white hover:text-yellow-300 transition-colors w-full text-center py-2",
                    location.pathname === "/admin" && "text-yellow-300 font-medium"
                  )}
                >
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        )}
        
        {/* Subtitle for large screens only */}
        <div className="hidden md:block text-center mt-1">
          <h3 className="text-lg font-medium text-white/90 hover:text-white transition-colors">Mock Test Platform</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
