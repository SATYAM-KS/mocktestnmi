
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle, XCircle, AlertTriangle, Download, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Question } from '@/components/QuestionCard';

// Reuse the generate questions function from the Test page
const generateFullQuestionSet = (): Question[] => {
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

interface SectionScore {
  section: string;
  correct: number;
  total: number;
  percentage: number;
}

const Results = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [questions] = useState<Question[]>(generateFullQuestionSet());
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });
  const [sectionScores, setSectionScores] = useState<SectionScore[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedAnswers = localStorage.getItem('userAnswers');
    
    if (!storedUserInfo || !storedAnswers) {
      toast.error('Please complete the test and login first');
      navigate('/test');
      return;
    }
    
    setUserInfo(JSON.parse(storedUserInfo));
    setUserAnswers(JSON.parse(storedAnswers));
    
    // Calculate score
    calculateScore(JSON.parse(storedAnswers));
  }, [navigate]);
  
  const calculateScore = (answers: Record<number, number>) => {
    let correctCount = 0;
    const sectionMap = new Map<string, { correct: number; total: number }>();
    
    questions.forEach((question, index) => {
      const questionNumber = index + 1;
      const userAnswer = answers[questionNumber];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      }
      
      // Track section scores
      if (!sectionMap.has(question.section)) {
        sectionMap.set(question.section, { correct: 0, total: 0 });
      }
      
      const sectionData = sectionMap.get(question.section)!;
      sectionData.total++;
      
      if (isCorrect) {
        sectionData.correct++;
      }
      
      sectionMap.set(question.section, sectionData);
    });
    
    const percentage = (correctCount / questions.length) * 100;
    
    setScore({
      correct: correctCount,
      total: questions.length,
      percentage: Math.round(percentage * 10) / 10
    });
    
    // Calculate section scores
    const sectionScoresArray: SectionScore[] = [];
    
    sectionMap.forEach((data, section) => {
      sectionScoresArray.push({
        section,
        correct: data.correct,
        total: data.total,
        percentage: Math.round((data.correct / data.total) * 100 * 10) / 10
      });
    });
    
    // Sort by section name
    sectionScoresArray.sort((a, b) => a.section.localeCompare(b.section));
    
    setSectionScores(sectionScoresArray);
  };
  
  const handleTakeNewTest = () => {
    // Clear test data
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('testCompleted');
    
    navigate('/test');
  };
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreIcon = (percentage: number) => {
    if (percentage >= 70) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (percentage >= 40) return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };
  
  if (!userInfo) {
    return null; // Loading or redirecting
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-40 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">MCA Mock Test Results</h1>
                  <button
                    onClick={handleTakeNewTest}
                    className="button-secondary text-sm"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Take New Test
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <div>
                    <p className="text-gray-600">Name: <span className="font-medium text-gray-900">{userInfo.name}</span></p>
                    <p className="text-gray-600">Email: <span className="font-medium text-gray-900">{userInfo.email}</span></p>
                    <p className="text-gray-600">Phone: <span className="font-medium text-gray-900">{userInfo.phone}</span></p>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 sm:text-right">
                    <p className="text-gray-600">Test Date: <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span></p>
                    <p className="text-gray-600">Questions: <span className="font-medium text-gray-900">{score.total}</span></p>
                    <p className="text-gray-600">Marks per Question: <span className="font-medium text-gray-900">2</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overall Score */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Overall Score</h2>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                    <div className="text-center">
                      <span className={`text-3xl font-bold ${getScoreColor(score.percentage)}`}>
                        {score.percentage}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xl font-medium mb-2">
                      <span className={getScoreColor(score.percentage)}>
                        {score.correct}
                      </span> 
                      <span className="text-gray-600"> out of </span>
                      <span className="text-gray-900">{score.total}</span>
                      <span className="text-gray-600"> correct answers</span>
                    </p>
                    
                    <p className="text-lg text-gray-600 mb-3">
                      Total Marks: <span className="font-medium text-gray-900">{score.correct * 2}</span> / {score.total * 2}
                    </p>
                    
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                      <div 
                        className={`rounded-full h-3 ${score.percentage >= 70 ? 'bg-green-500' : score.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${score.percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center">
                      {getScoreIcon(score.percentage)}
                      <span className="ml-2 font-medium">
                        {score.percentage >= 70 ? 'Excellent! Keep up the good work.' : 
                         score.percentage >= 40 ? 'Good effort! There\'s room for improvement.' : 
                         'You need more practice. Don\'t give up!'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section-wise Scores */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Section-wise Performance</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Section
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sectionScores.map((section, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {section.section}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {section.correct} / {section.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={getScoreColor(section.percentage)}>
                              {section.percentage}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Print/Download Button */}
            <div className="text-center">
              <button
                onClick={() => window.print()}
                className="button-primary inline-flex items-center"
              >
                <Download className="mr-2 h-4 w-4" /> Download Results
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
