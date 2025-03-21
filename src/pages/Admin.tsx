
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Question } from '@/components/QuestionCard';
import AdminLogin from '@/components/admin/AdminLogin';
import TabsNav from '@/components/admin/TabsNav';
import QuestionManagement from '@/components/admin/QuestionManagement';
import SectionManagement from '@/components/admin/SectionManagement';
import StudentResults from '@/components/admin/StudentResults';

interface Section {
  id: string;
  name: string;
}

interface StudentResult {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sections, setSections] = useState<Section[]>([
    { id: '1', name: 'Programming Fundamentals' },
    { id: '2', name: 'Database Management' },
    { id: '3', name: 'Algorithms & Data Structures' },
    { id: '4', name: 'Computer Networks' },
    { id: '5', name: 'Operating Systems' },
  ]);
  
  const [students, setStudents] = useState<StudentResult[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      score: 75,
      totalQuestions: 100,
      percentage: 75,
      date: '2023-07-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      score: 82,
      totalQuestions: 100,
      percentage: 82,
      date: '2023-07-16'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael@example.com',
      phone: '5555555555',
      score: 68,
      totalQuestions: 100,
      percentage: 68,
      date: '2023-07-17'
    },
  ]);
  
  useEffect(() => {
    // Mock loading questions
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
    
    setQuestions(mockQuestions);
  }, []);
  
  // If not logged in, show login screen
  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-40 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-600">
                Manage questions, sections, and view student results
              </p>
            </div>
            
            {/* Tabs */}
            <TabsNav activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Questions Tab */}
              {activeTab === 'questions' && (
                <QuestionManagement 
                  questions={questions} 
                  sections={sections} 
                  setQuestions={setQuestions} 
                />
              )}
              
              {/* Sections Tab */}
              {activeTab === 'sections' && (
                <SectionManagement 
                  sections={sections} 
                  setSections={setSections} 
                  questions={questions} 
                />
              )}
              
              {/* Results Tab */}
              {activeTab === 'results' && (
                <StudentResults students={students} />
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;

