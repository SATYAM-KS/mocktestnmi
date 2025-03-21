
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuestionCard, { Question } from '@/components/QuestionCard';
import QuestionPalette from '@/components/QuestionPalette';

// Mock questions data - this would come from the backend in a real application
const mockQuestions: Question[] = [
  {
    id: 1,
    question: "Which of the following is NOT a primitive data type in Java?",
    options: ["int", "boolean", "String", "float"],
    correctAnswer: 2,
    section: "Programming Fundamentals"
  },
  {
    id: 2,
    question: "What is the time complexity of binary search algorithm?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
    correctAnswer: 2,
    section: "Algorithms & Data Structures"
  },
  {
    id: 3,
    question: "Which of the following is used to establish a connection with a database in Java?",
    options: ["JDBC", "JVM", "JRE", "JSP"],
    correctAnswer: 0,
    section: "Database Management"
  },
  {
    id: 4,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"],
    correctAnswer: 0,
    section: "Database Management"
  },
  {
    id: 5,
    question: "Which of the following is NOT a feature of Object-Oriented Programming?",
    options: ["Inheritance", "Encapsulation", "Pointer Arithmetic", "Polymorphism"],
    correctAnswer: 2,
    section: "Programming Fundamentals"
  },
];

// For a full test, we would have 100 questions as specified in requirements
// Here we're using a smaller set for demonstration
const generateFullQuestionSet = (): Question[] => {
  const questionSet: Question[] = [...mockQuestions];
  
  // Generate more questions to reach 100
  for (let i = 6; i <= 100; i++) {
    questionSet.push({
      id: i,
      question: `Sample Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: i % 5 === 0 ? "Programming Fundamentals" : 
              i % 4 === 0 ? "Database Management" : 
              i % 3 === 0 ? "Algorithms & Data Structures" :
              i % 2 === 0 ? "Computer Networks" : "Operating Systems"
    });
  }
  
  return questionSet;
};

type QuestionStatus = 'unattempted' | 'seen' | 'attempted';

const Test = () => {
  const navigate = useNavigate();
  const [questions] = useState<Question[]>(generateFullQuestionSet());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;
  
  // Mark question as seen when viewed
  useEffect(() => {
    if (!questionStatuses[currentQuestionNumber] || questionStatuses[currentQuestionNumber] === 'unattempted') {
      setQuestionStatuses(prev => ({
        ...prev,
        [currentQuestionNumber]: 'seen'
      }));
    }
  }, [currentQuestionIndex, questionStatuses, currentQuestionNumber]);
  
  const handleOptionSelect = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionNumber]: optionIndex
    }));
    
    setQuestionStatuses(prev => ({
      ...prev,
      [currentQuestionNumber]: 'attempted'
    }));
  };
  
  const navigateToQuestion = (questionNumber: number) => {
    setCurrentQuestionIndex(questionNumber - 1);
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };
  
  const handleSubmitTest = () => {
    // Store answers in local storage for result page
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('testCompleted', 'true');
    
    toast.success('Test submitted successfully');
    
    // Navigate to login to view results
    navigate('/login');
  };
  
  const attemptedCount = Object.keys(userAnswers).length;
  const remainingCount = questions.length - attemptedCount;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-40 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Test Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">MCA Mock Test</h1>
            <p className="text-gray-600">
              100 questions • 2 marks each • No negative marking • No time limit
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-grow order-2 lg:order-1">
              {/* Question Card */}
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionNumber}
                selectedOption={userAnswers[currentQuestionNumber] !== undefined ? userAnswers[currentQuestionNumber] : null}
                onOptionSelect={handleOptionSelect}
              />
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="button-secondary inline-flex items-center disabled:opacity-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </button>
                
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="button-primary inline-flex items-center mx-2"
                >
                  <Save className="mr-2 h-4 w-4" /> Submit Test
                </button>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="button-secondary inline-flex items-center disabled:opacity-50"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80 order-1 lg:order-2">
              {/* Test Progress */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <h3 className="text-lg font-medium mb-3">Test Progress</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Attempted</span>
                  <span className="font-medium">{attemptedCount} / {questions.length}</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div 
                    className="bg-nmiet-blue rounded-full h-2.5 transition-all duration-500"
                    style={{ width: `${(attemptedCount / questions.length) * 100}%` }}
                  ></div>
                </div>
                
                <button
                  onClick={toggleSummary}
                  className="mt-4 text-nmiet-blue hover:underline text-sm font-medium inline-flex items-center"
                >
                  {showSummary ? 'Hide Summary' : 'Show Summary'}
                </button>
                
                {showSummary && (
                  <div className="mt-3 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attempted</span>
                      <span className="font-medium text-green-600">{attemptedCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Not Attempted</span>
                      <span className="font-medium text-red-600">{remainingCount}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Question Palette */}
              <QuestionPalette
                totalQuestions={questions.length}
                questionStatuses={questionStatuses}
                currentQuestion={currentQuestionNumber}
                onQuestionSelect={navigateToQuestion}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
                <h3 className="text-lg font-medium">Submit Test</h3>
              </div>
              <button onClick={() => setIsSubmitModalOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              You have attempted {attemptedCount} out of {questions.length} questions. Are you sure you want to submit the test?
            </p>
            
            {remainingCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  You still have {remainingCount} unanswered questions.
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTest}
                className="button-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Test;
