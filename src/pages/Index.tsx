
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-40 pb-16">
        {/* Hero Section */}
        <section className={`container mx-auto px-4 md:px-6 mb-24 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-nmiet-blue/10 text-nmiet-blue rounded-full text-sm font-medium mb-4">
              NMIET Mock Test Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Prepare for Success with Our Mock Tests
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practice, learn, and excel with our comprehensive mock tests designed specifically for NMIET students.
            </p>
            <Link 
              to="/test" 
              className="button-primary inline-flex items-center"
            >
              Start MCA Test <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-nmiet-blue/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-nmiet-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">Comprehensive Questions</h3>
              <p className="text-gray-600">
                Our mock tests contain a wide range of questions to thoroughly test your knowledge.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-nmiet-blue/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-nmiet-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">MCA Specific</h3>
              <p className="text-gray-600">
                Questions designed specifically for MCA students to enhance their preparation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-nmiet-blue/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-nmiet-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get your score immediately after completing the test to track your progress.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-nmiet-blue/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-nmiet-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Time Constraints</h3>
              <p className="text-gray-600">
                Take the test at your own pace without any time pressure, allowing thorough learning.
              </p>
            </div>
          </div>
        </section>
        
        {/* Test Information Section */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">MCA Mock Test</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Test Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-gray-500">Questions:</span>
                      <span>100 Multiple Choice</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-gray-500">Marks:</span>
                      <span>2 marks per question</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-gray-500">Total Marks:</span>
                      <span>200</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-gray-500">Negative Marking:</span>
                      <span>No</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="w-32 text-gray-500">Time Limit:</span>
                      <span>No time limit</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Instructions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Each question has only one correct answer.</li>
                    <li>You can review and change your answers before submission.</li>
                    <li>You will need to log in to view your results after completion.</li>
                    <li>The question palette helps you track your progress.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  to="/test" 
                  className="button-primary inline-flex items-center"
                >
                  Start MCA Test Now <ArrowRight className="ml-2 h-4 w-4" />
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
