
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Mail, Lock, Plus, Trash, Edit, Save, X, Eye, EyeOff, Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Question } from '@/components/QuestionCard';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
  
  // Mock editing states
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newSection, setNewSection] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    section: '',
  });
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [studentSearch, setStudentSearch] = useState('');
  
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
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication
    if (email === 'admin@nmiet.edu' && password === 'admin123') {
      setIsLoggedIn(true);
      toast.success('Logged in successfully');
    } else {
      toast.error('Invalid credentials');
    }
  };
  
  const handleAddQuestion = () => {
    // Validate form
    if (!newQuestion.question || newQuestion.options.some(option => !option) || !newQuestion.section) {
      toast.error('Please fill all fields');
      return;
    }
    
    // Add new question
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    setQuestions([
      ...questions,
      {
        id: newId,
        question: newQuestion.question,
        options: [...newQuestion.options],
        correctAnswer: newQuestion.correctAnswer,
        section: newQuestion.section
      }
    ]);
    
    // Reset form
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      section: '',
    });
    
    setShowAddQuestionModal(false);
    toast.success('Question added successfully');
  };
  
  const handleUpdateQuestion = () => {
    if (!editingQuestion) return;
    
    // Update question
    setQuestions(
      questions.map(q => 
        q.id === editingQuestion.id ? editingQuestion : q
      )
    );
    
    setEditingQuestion(null);
    toast.success('Question updated successfully');
  };
  
  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success('Question deleted successfully');
  };
  
  const handleAddSection = () => {
    if (!newSection) {
      toast.error('Please enter a section name');
      return;
    }
    
    // Check if section already exists
    if (sections.some(s => s.name.toLowerCase() === newSection.toLowerCase())) {
      toast.error('Section already exists');
      return;
    }
    
    const newId = (parseInt(sections[sections.length - 1]?.id || '0') + 1).toString();
    
    setSections([
      ...sections,
      { id: newId, name: newSection }
    ]);
    
    setNewSection('');
    setShowAddSectionModal(false);
    toast.success('Section added successfully');
  };
  
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'all' || question.section === sectionFilter;
    
    return matchesSearch && matchesSection;
  });
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );
  
  // If not logged in, show login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-40 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
                    <p className="text-gray-600">
                      Please enter your credentials to access the admin panel
                    </p>
                  </div>
                  
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                            placeholder="admin@nmiet.edu"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                            placeholder="••••••••"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="w-full button-primary py-2.5"
                        >
                          Login
                        </button>
                      </div>
                      
                      <div className="text-sm text-center text-gray-600">
                        <p>For demo purposes use:</p>
                        <p>Email: admin@nmiet.edu</p>
                        <p>Password: admin123</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
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
            <div className="border-t border-b">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('questions')}
                  className={cn(
                    "px-6 py-3 text-sm font-medium whitespace-nowrap",
                    activeTab === 'questions' 
                      ? "border-b-2 border-nmiet-blue text-nmiet-blue" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Questions
                </button>
                <button
                  onClick={() => setActiveTab('sections')}
                  className={cn(
                    "px-6 py-3 text-sm font-medium whitespace-nowrap",
                    activeTab === 'sections' 
                      ? "border-b-2 border-nmiet-blue text-nmiet-blue" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Sections
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={cn(
                    "px-6 py-3 text-sm font-medium whitespace-nowrap",
                    activeTab === 'results' 
                      ? "border-b-2 border-nmiet-blue text-nmiet-blue" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Student Results
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* Questions Tab */}
              {activeTab === 'questions' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex items-center">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search questions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 pr-4 py-2 border rounded-md focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue w-full sm:w-auto"
                        />
                      </div>
                      
                      <div className="ml-2">
                        <select
                          value={sectionFilter}
                          onChange={(e) => setSectionFilter(e.target.value)}
                          className="pl-4 pr-8 py-2 border rounded-md focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue appearance-none"
                        >
                          <option value="all">All Sections</option>
                          {sections.map((section) => (
                            <option key={section.id} value={section.name}>
                              {section.name}
                            </option>
                          ))}
                        </select>
                        <Filter className="relative inline-flex -ml-6 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowAddQuestionModal(true)}
                      className="button-primary inline-flex items-center"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Question
                    </button>
                  </div>
                  
                  {filteredQuestions.length > 0 ? (
                    <div className="space-y-4">
                      {filteredQuestions.map((question) => (
                        <div key={question.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-500">{question.section}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingQuestion(question)}
                                className="p-1 rounded-md text-gray-500 hover:text-nmiet-blue hover:bg-nmiet-blue/10"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(question.id)}
                                className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <h3 className="text-base font-medium mb-2">{question.question}</h3>
                          
                          <div className="space-y-2 ml-4">
                            {question.options.map((option, index) => (
                              <div key={index} className="flex items-center">
                                <div 
                                  className={cn(
                                    "h-4 w-4 rounded-full mr-2 flex items-center justify-center",
                                    index === question.correctAnswer 
                                      ? "bg-green-100 text-green-600 border border-green-600" 
                                      : "bg-gray-100 text-gray-400 border border-gray-300"
                                  )}
                                >
                                  {index === question.correctAnswer && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                  )}
                                </div>
                                <span className={cn(
                                  "text-sm",
                                  index === question.correctAnswer ? "text-green-600 font-medium" : "text-gray-600"
                                )}>
                                  {option}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No questions found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Sections Tab */}
              {activeTab === 'sections' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Test Sections</h2>
                    <button
                      onClick={() => setShowAddSectionModal(true)}
                      className="button-primary inline-flex items-center"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Section
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((section) => (
                      <div key={section.id} className="border rounded-md p-4 flex justify-between items-center">
                        <span className="font-medium">{section.name}</span>
                        <span className="text-sm text-gray-500">
                          {questions.filter(q => q.section === section.name).length} questions
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Results Tab */}
              {activeTab === 'results' && (
                <div>
                  <div className="mb-6">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students by name or email..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 border rounded-md focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Percentage
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStudents.map((student) => (
                          <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.score} / {student.totalQuestions * 2}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={cn(
                                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                student.percentage >= 70 ? "bg-green-100 text-green-800" :
                                student.percentage >= 40 ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              )}>
                                {student.percentage}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(student.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {filteredStudents.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No student results found matching your search criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in overflow-y-auto py-10">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 animate-scale-in m-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Add New Question</h3>
              <button onClick={() => setShowAddQuestionModal(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  rows={2}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                  placeholder="Enter the question"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <input
                        type="radio"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() => setNewQuestion({...newQuestion, correctAnswer: index})}
                        className="h-4 w-4 text-nmiet-blue focus:ring-nmiet-blue"
                      />
                      <span className="ml-1 text-sm text-gray-700">Correct</span>
                    </div>
                    <input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOptions});
                      }}
                      className="flex-1 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  value={newQuestion.section}
                  onChange={(e) => setNewQuestion({...newQuestion, section: e.target.value})}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                >
                  <option value="">Select a section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddQuestionModal(false)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="button-primary inline-flex items-center"
              >
                <Save className="mr-2 h-4 w-4" /> Save Question
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in overflow-y-auto py-10">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 animate-scale-in m-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Edit Question</h3>
              <button onClick={() => setEditingQuestion(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <textarea
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                  rows={2}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                  placeholder="Enter the question"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                {editingQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      <input
                        type="radio"
                        checked={editingQuestion.correctAnswer === index}
                        onChange={() => setEditingQuestion({...editingQuestion, correctAnswer: index})}
                        className="h-4 w-4 text-nmiet-blue focus:ring-nmiet-blue"
                      />
                      <span className="ml-1 text-sm text-gray-700">Correct</span>
                    </div>
                    <input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options];
                        newOptions[index] = e.target.value;
                        setEditingQuestion({...editingQuestion, options: newOptions});
                      }}
                      className="flex-1 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  value={editingQuestion.section}
                  onChange={(e) => setEditingQuestion({...editingQuestion, section: e.target.value})}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                >
                  <option value="">Select a section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.name}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingQuestion(null)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateQuestion}
                className="button-primary inline-flex items-center"
              >
                <Save className="mr-2 h-4 w-4" /> Update Question
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Add New Section</h3>
              <button onClick={() => setShowAddSectionModal(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Name
              </label>
              <input
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                placeholder="e.g., Data Structures"
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="button-primary inline-flex items-center"
              >
                <Save className="mr-2 h-4 w-4" /> Save Section
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Admin;
