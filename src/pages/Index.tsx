
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="flex-grow pt-40 pb-16">
        {/* Hero Section */}
        <section className={`container mx-auto px-4 md:px-6 mb-24 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-4 transform hover:scale-105 transition-transform">
              NMIET Mock Test Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prepare for Success with Our Mock Tests
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practice, learn, and excel with our comprehensive mock tests.
            </p>
            <Link 
              to="/test" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Start MCA Test <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
            </Link>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold relative inline-block pb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              className={`bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${activeFeature === 0 ? 'ring-2 ring-blue-400 scale-105' : ''}`}
              onMouseEnter={() => setActiveFeature(0)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:rotate-12">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">Comprehensive Questions</h3>
              <p className="text-gray-600">
                Our mock tests contain a wide range of questions to thoroughly test your knowledge.
              </p>
            </div>
            
            <div 
              className={`bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${activeFeature === 1 ? 'ring-2 ring-indigo-400 scale-105' : ''}`}
              onMouseEnter={() => setActiveFeature(1)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:rotate-12">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-indigo-600">MCA Specific</h3>
              <p className="text-gray-600">
                Questions designed specifically for MCA students to enhance their preparation.
              </p>
            </div>
            
            <div 
              className={`bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${activeFeature === 2 ? 'ring-2 ring-purple-400 scale-105' : ''}`}
              onMouseEnter={() => setActiveFeature(2)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:rotate-12">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-purple-600">Instant Results</h3>
              <p className="text-gray-600">
                Get your score immediately after completing the test to track your progress.
              </p>
            </div>
            
            <div 
              className={`bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${activeFeature === 3 ? 'ring-2 ring-pink-400 scale-105' : ''}`}
              onMouseEnter={() => setActiveFeature(3)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:rotate-12">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-pink-600">No Time Constraints</h3>
              <p className="text-gray-600">
                Take the test at your own pace without any time pressure, allowing thorough learning.
              </p>
            </div>
          </div>
        </section>
        
        {/* Test Information Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold">MCA Mock Test</h2>
            </div>
            <div className="p-6 md:p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-3 text-blue-700">Test Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-blue-500 font-medium">Questions:</span>
                      <span>100 Multiple Choice</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-blue-500 font-medium">Marks:</span>
                      <span>2 marks per question</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-blue-500 font-medium">Total Marks:</span>
                      <span>200</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-blue-500 font-medium">Negative Marking:</span>
                      <span>No</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-blue-500 font-medium">Time Limit:</span>
                      <span>No time limit</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium mb-3 text-purple-700">Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Each question has only one correct answer.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>You can review and change your answers before submission.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>You will need to log in to view your results after completion.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>The question palette helps you track your progress.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  to="/test" 
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Start MCA Test Now <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
