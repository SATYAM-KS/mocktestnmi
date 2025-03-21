
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
        isScrolled ? 'glass-effect shadow-sm py-2' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/f43f82f7-7d13-4e58-8f7e-70aca1c5b98a.png"
                alt="NMIET Logo"
                className="h-16 w-auto animate-fade-in"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex flex-col items-center">
            <h1 className="font-medium text-base sm:text-lg text-gray-800">
              Nutan Maharashtra Vidya Prasarak Mandal's
            </h1>
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-nmiet-blue">
              NUTAN MAHARASHTRA INSTITUTE OF ENGINEERING & TECHNOLOGY, PUNE
            </h2>
            <p className="text-xs sm:text-sm mt-1 text-gray-600">
              Under administrative support of Pimpri Chinchwad Education Trust (PCET)
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={cn(
                  "text-gray-800 hover:text-nmiet-blue transition-colors",
                  location.pathname === "/" && "text-nmiet-blue font-medium"
                )}
              >
                Home
              </Link>
              
              <div className="relative">
                <button 
                  onClick={toggleTestDropdown}
                  className={cn(
                    "flex items-center text-gray-800 hover:text-nmiet-blue transition-colors",
                    (location.pathname === "/test" || isTestDropdownOpen) && "text-nmiet-blue font-medium"
                  )}
                >
                  Tests <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isTestDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-effect rounded-md shadow-md overflow-hidden animate-scale-in origin-top">
                    <div className="py-1">
                      <Link
                        to="/test"
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        MCA Test
                      </Link>
                      <div className="block px-4 py-2 text-gray-400 cursor-not-allowed">
                        Test 2 (Coming Soon)
                      </div>
                      <div className="block px-4 py-2 text-gray-400 cursor-not-allowed">
                        Test 3 (Coming Soon)
                      </div>
                      <div className="block px-4 py-2 text-gray-400 cursor-not-allowed">
                        Test 4 (Coming Soon)
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                to="/admin" 
                className={cn(
                  "text-gray-800 hover:text-nmiet-blue transition-colors",
                  location.pathname === "/admin" && "text-nmiet-blue font-medium"
                )}
              >
                Admin
              </Link>
            </nav>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 focus:outline-none"
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
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect shadow-md animate-slide-in">
            <div className="flex flex-col items-center py-4 px-4 space-y-2">
              <h1 className="font-medium text-sm text-gray-800">
                Nutan Maharashtra Vidya Prasarak Mandal's
              </h1>
              <h2 className="font-bold text-base text-nmiet-blue text-center">
                NUTAN MAHARASHTRA INSTITUTE OF ENGINEERING & TECHNOLOGY, PUNE
              </h2>
              <p className="text-xs mt-1 text-gray-600 text-center">
                Under administrative support of Pimpri Chinchwad Education Trust (PCET)
              </p>
              
              <div className="w-full h-px bg-gray-200 my-2"></div>
              
              <nav className="flex flex-col items-center space-y-4 w-full">
                <Link 
                  to="/" 
                  className={cn(
                    "text-gray-800 hover:text-nmiet-blue transition-colors w-full text-center py-2",
                    location.pathname === "/" && "text-nmiet-blue font-medium"
                  )}
                >
                  Home
                </Link>
                
                <div className="w-full">
                  <button 
                    onClick={toggleTestDropdown}
                    className={cn(
                      "flex items-center justify-center w-full text-gray-800 hover:text-nmiet-blue transition-colors py-2",
                      (location.pathname === "/test" || isTestDropdownOpen) && "text-nmiet-blue font-medium"
                    )}
                  >
                    Tests <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isTestDropdownOpen && (
                    <div className="w-full bg-white/50 backdrop-blur-sm rounded-md my-1 animate-slide-in">
                      <div className="py-1">
                        <Link
                          to="/test"
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors text-center"
                        >
                          MCA Test
                        </Link>
                        <div className="block px-4 py-2 text-gray-400 cursor-not-allowed text-center">
                          Test 2 (Coming Soon)
                        </div>
                        <div className="block px-4 py-2 text-gray-400 cursor-not-allowed text-center">
                          Test 3 (Coming Soon)
                        </div>
                        <div className="block px-4 py-2 text-gray-400 cursor-not-allowed text-center">
                          Test 4 (Coming Soon)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/admin" 
                  className={cn(
                    "text-gray-800 hover:text-nmiet-blue transition-colors w-full text-center py-2",
                    location.pathname === "/admin" && "text-nmiet-blue font-medium"
                  )}
                >
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        )}
        
        {/* Subtitle for large screens only */}
        <div className="hidden md:block text-center mt-2">
          <h3 className="text-lg font-medium text-gray-700">Mock Test Platform</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
