import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertCircle, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuestionCard, { Question } from '@/components/QuestionCard';
import QuestionPalette, { TestSection, SectionedQuestion } from '@/components/QuestionPalette';

// Define the questions with their sections
const generateFullQuestionSet = (): (Question & SectionedQuestion)[] => {
  const sections: TestSection[] = [
    'Mathematics & Statistics',
    'Logical / Abstract Reasoning', 
    'English Comprehension & Verbal Ability',
    'Computer Concepts'
  ];
  
  const questions: (Question & SectionedQuestion)[] = [];
  
  // Mathematics & Statistics (1-30)
  for (let i = 1; i <= 30; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'Mathematics & Statistics'
    });
  }
  
  // Logical / Abstract Reasoning (31-60)
  for (let i = 31; i <= 60; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'Logical / Abstract Reasoning'
    });
  }
  
  // English Comprehension & Verbal Ability (61-80)
  for (let i = 61; i <= 80; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'English Comprehension & Verbal Ability'
    });
  }
  
  // Computer Concepts (81-100)
  for (let i = 81; i <= 100; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'Computer Concepts'
    });
  }
  
  return questions;
};

type QuestionStatus = 'unattempted' | 'seen' | 'attempted';

const Test = () => {
  const navigate = useNavigate();
  const [questions] = useState<(Question & SectionedQuestion)[]>(generateFullQuestionSet());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [questionStatuses, setQuestionStatuses] = useState<Record<number, QuestionStatus>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;
  
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
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('testCompleted', 'true');
    
    toast.success('Test submitted successfully');
    
    navigate('/login');
  };
  
  const attemptedCount = Object.keys(userAnswers).length;
  const remainingCount = questions.length - attemptedCount;
  
  const sectionProgress = {
    'Mathematics & Statistics': {
      total: 30,
      attempted: Object.keys(userAnswers).filter(key => {
        const qNum = parseInt(key);
        return qNum >= 1 && qNum <= 30;
      }).length
    },
    'Logical / Abstract Reasoning': {
      total: 30,
      attempted: Object.keys(userAnswers).filter(key => {
        const qNum = parseInt(key);
        return qNum >= 31 && qNum <= 60;
      }).length
    },
    'English Comprehension & Verbal Ability': {
      total: 20,
      attempted: Object.keys(userAnswers).filter(key => {
        const qNum = parseInt(key);
        return qNum >= 61 && qNum <= 80;
      }).length
    },
    'Computer Concepts': {
      total: 20,
      attempted: Object.keys(userAnswers).filter(key => {
        const qNum = parseInt(key);
        return qNum >= 81 && qNum <= 100;
      }).length
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-40 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">MCA Mock Test</h1>
            <p className="text-gray-600">
              100 questions • 2 marks each • No negative marking • No time limit
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow order-2 lg:order-1">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-medium rounded-full text-sm">
                  Section: {currentQuestion.section}
                </span>
                <span className="ml-3 text-sm text-gray-500">
                  Question {currentQuestionNumber} of 100
                </span>
              </div>
              
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionNumber}
                selectedOption={userAnswers[currentQuestionNumber] !== undefined ? userAnswers[currentQuestionNumber] : null}
                onOptionSelect={handleOptionSelect}
              />
              
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
            
            <div className="lg:w-80 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <h3 className="text-lg font-medium mb-3">Test Progress</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Attempted</span>
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
                  <div className="mt-3 text-sm space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-700">Mathematics & Statistics</span>
                        <span className="text-green-600">{sectionProgress['Mathematics & Statistics'].attempted}/{sectionProgress['Mathematics & Statistics'].total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 rounded-full h-1.5"
                          style={{ width: `${(sectionProgress['Mathematics & Statistics'].attempted / sectionProgress['Mathematics & Statistics'].total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-700">Logical / Abstract Reasoning</span>
                        <span className="text-purple-600">{sectionProgress['Logical / Abstract Reasoning'].attempted}/{sectionProgress['Logical / Abstract Reasoning'].total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 rounded-full h-1.5"
                          style={{ width: `${(sectionProgress['Logical / Abstract Reasoning'].attempted / sectionProgress['Logical / Abstract Reasoning'].total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-700">English Comprehension</span>
                        <span className="text-blue-600">{sectionProgress['English Comprehension & Verbal Ability'].attempted}/{sectionProgress['English Comprehension & Verbal Ability'].total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 rounded-full h-1.5"
                          style={{ width: `${(sectionProgress['English Comprehension & Verbal Ability'].attempted / sectionProgress['English Comprehension & Verbal Ability'].total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-700">Computer Concepts</span>
                        <span className="text-orange-600">{sectionProgress['Computer Concepts'].attempted}/{sectionProgress['Computer Concepts'].total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="bg-orange-500 rounded-full h-1.5"
                          style={{ width: `${(sectionProgress['Computer Concepts'].attempted / sectionProgress['Computer Concepts'].total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Not Attempted</span>
                        <span className="font-medium text-red-600">{remainingCount}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <QuestionPalette
                totalQuestions={questions.length}
                questionStatuses={questionStatuses}
                currentQuestion={currentQuestionNumber}
                onQuestionSelect={navigateToQuestion}
                questions={questions}
              />
            </div>
          </div>
        </div>
      </main>
      
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
