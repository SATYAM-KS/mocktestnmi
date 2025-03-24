
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminLogin from '@/components/admin/AdminLogin';
import TabsNav from '@/components/admin/TabsNav';
import QuestionManagement from '@/components/admin/QuestionManagement';
import SectionManagement from '@/components/admin/SectionManagement';
import StudentResults from '@/components/admin/StudentResults';
import { Question } from '@/components/QuestionCard';

// Define a type that makes correctAnswer required
type QuestionWithRequiredCorrectAnswer = Omit<Question, 'correctAnswer'> & {
  correctAnswer: number;
};

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
  
  const [questions, setQuestions] = useState<QuestionWithRequiredCorrectAnswer[]>([]);
  const [sections, setSections] = useState<Section[]>([
    { id: '1', name: 'Mathematics & Statistics' },
    { id: '2', name: 'Logical / Abstract Reasoning' },
    { id: '3', name: 'English Comprehension & Verbal Ability' },
    { id: '4', name: 'Computer Concepts' },
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
    // Mock questions for each section
    const mathQuestions: QuestionWithRequiredCorrectAnswer[] = [
      {
        id: 1,
        question: "The general tendency of the data to increase or decrease during a long period of time is known as?",
        options: ["Secular trend", "Cyclical fluctuation", "Irregular movement", "Seasonal variation"],
        correctAnswer: 0,
        section: "Mathematics & Statistics"
      },
      {
        id: 2,
        question: "The elements of the set {x : x is an integer, x² ≤ 4} can be represented as .....Z..... . Here, Z refers to:",
        options: ["{–2, 2}", "{–1, 0, 1}", "{–2, –1, 0, 1, 2}", "{0, 1, 2}"],
        correctAnswer: 2,
        section: "Mathematics & Statistics"
      },
      {
        id: 3,
        question: "Find the centre and radius of the circle 2x² + 2y² = 3x – 5y + 7.",
        options: ["Centre (3/4, -5/4), radius = 3", "Centre (5/4, -3/4), radius = 2", "Centre (3/4, -5/4), radius = 2", "None of these"],
        correctAnswer: 0,
        section: "Mathematics & Statistics"
      },
      {
        id: 4,
        question: "Which is not a relative measure of skewness?",
        options: ["(Q3 - Q2) - (Q2 - Q1) / (Q3 - Q1)", "(P⁹⁰ - 2P⁵⁰ + P¹⁰) / (P⁹⁰ - P¹⁰)", "Mean - Mode", "Mean - Mode + Median"],
        correctAnswer: 2,
        section: "Mathematics & Statistics"
      },
      {
        id: 5,
        question: "Sampling fluctuations may be described as:",
        options: ["The variation in the values of a sample", "The differences in the values of a parameter", "The variation in the values of a statistic", "The variation in the values of observations"],
        correctAnswer: 2,
        section: "Mathematics & Statistics"
      },
      {
        id: 6,
        question: "The value of the sum 1/(3² + 1) + 1/(4² + 2) + 1/(5² + 3) + 1/(6² + 4)……… ∞ is equal to:",
        options: ["13/36", "12/36", "15/36", "18/36"],
        correctAnswer: 0,
        section: "Mathematics & Statistics"
      },
      {
        id: 7,
        question: "Vital statistics is mainly concerned with:",
        options: ["Births", "Deaths", "Marriages", "All of the above"],
        correctAnswer: 3,
        section: "Mathematics & Statistics"
      },
      {
        id: 8,
        question: "If the points (1, 1), (-1, -1), and (-√3, k) are the vertices of an equilateral triangle, then k = ?",
        options: ["√2", "-√3", "√3", "None of these"],
        correctAnswer: 2,
        section: "Mathematics & Statistics"
      },
      {
        id: 9,
        question: "Replication in an experiment means:",
        options: ["Total number of treatments", "The number of blocks", "The number of times a treatment occurs in an experiment", "None of the above"],
        correctAnswer: 2,
        section: "Mathematics & Statistics"
      },
      {
        id: 10,
        question: "Two dice are thrown simultaneously. The probability of obtaining a total score of seven is:",
        options: ["1/6", "1/8", "1/12", "1/36"],
        correctAnswer: 0,
        section: "Mathematics & Statistics"
      }
    ];
    
    const logicalQuestions: QuestionWithRequiredCorrectAnswer[] = [
      {
        id: 31,
        question: "Study the following information carefully and answer the question given below: J, K, L, M, N, O, and P are seven kids playing in the garden. They are wearing clothes of colors black, blue, white, green, pink, yellow, and brown. Out of the seven, three are girls. No girls are wearing either black, yellow, or brown. M's sister O is wearing pink, while he is wearing brown. J is wearing blue while his sister K is not green. N is wearing yellow while his best friend P is a boy. What colors are the sisters of J and M wearing?",
        options: ["Pink & Green", "Pink & Yellow", "White & Green", "White & Pink", "None of these"],
        correctAnswer: 3,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 32,
        question: "Study the following arrangement carefully and answer the questions given below: PJ%5D$LO3#AQ4@UFT8*Z8K2M&H. How many such numbers are there in the above arrangement, each of which is immediately preceded by a symbol and immediately followed by a consonant?",
        options: ["One", "Two", "Three", "None", "None of these"],
        correctAnswer: 1,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 33,
        question: "In these questions, two statements are followed by conclusions numbered I and II. You have to take the given statements to be true even if they seem to be at variance from commonly known facts and then decide which of the given conclusions logically follows from the given statements disregarding commonly known facts. Statements: Some books are bags. All bags are trees. Conclusions: I. Some books are trees. II. Some trees are books.",
        options: ["If only conclusion I follows", "If only conclusion II follows", "If either I or II follows", "If neither I nor II follows", "If both I and II follow"],
        correctAnswer: 4,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 34,
        question: "What should come in place of the question mark (?) in the following series? AC, FH, KM, PR, ?",
        options: ["UW", "VX", "VW", "TV", "None of these"],
        correctAnswer: 0,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 35,
        question: "The question given below is based on problem figures. Which one of the five answer figures on the right should come after the problem figures on the left, if the sequence were continued?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
        correctAnswer: 1,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 36,
        question: "Study the following information carefully and answer the question given below: J, K, L, M, N, O, and P are seven kids playing in the garden. They are wearing clothes of colors black, blue, white, green, pink, yellow, and brown. Out of the seven, three are girls. No girls are wearing either black, yellow, or brown. M's sister O is wearing pink, while he is wearing brown. J is wearing blue while his sister K is not green. N is wearing yellow while his best friend P is a boy. What color is P wearing?",
        options: ["Black", "Blue", "White", "Green", "None of these"],
        correctAnswer: 3,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 37,
        question: "Team A has scored more goals than Team B. Team C has scored fewer goals than Team B. Team A has scored fewer goals than Team C. If the first two statements are true, the third statement is:",
        options: ["True", "False", "Uncertain", "None"],
        correctAnswer: 1,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 38,
        question: "Study the following arrangement carefully and answer the question given below: PJ%5DDO, #3Q, @4F, ?",
        options: ["Z*8", "T*8", "Z*k", "T*z", "*T8"],
        correctAnswer: 4,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 39,
        question: "Study the following arrangement carefully and answer the questions given below: I T # A J 7 B $ D 2 K @ E L 5 H P E %. How many such symbols are there in the above arrangement, each of which is immediately followed by a vowel and not immediately preceded by a number?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        section: "Logical / Abstract Reasoning"
      },
      {
        id: 40,
        question: "In each of the questions given below, which one of the five answer figures should come after the problem figures on the left, if the sequence were to be continued?",
        options: ["a)", "b)", "c)", "d)", "e)"],
        correctAnswer: 2,
        section: "Logical / Abstract Reasoning"
      }
    ];
    
    const englishQuestions: QuestionWithRequiredCorrectAnswer[] = [
      {
        id: 61,
        question: "What should come next in the following letter series? H G F E D C B A G F E D C B A G F E D C B",
        options: ["E", "G", "F", "B", "None of the above"],
        correctAnswer: 2,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 62,
        question: "In the following question, one part of the sentence may have an error. Find out which part of the sentence has an error. A. He passionately studies B. So that he clears SSC CGL C. At the very first attempt D. No error",
        options: ["A", "B", "C", "D"],
        correctAnswer: 0,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 63,
        question: "Awareness means the capacity to see a coffee pot and hear the birds sing in one's own way, and not the way one was taught. The given passage implies that:",
        options: ["Knowledge of the learned is exclusive to them", "A learned man cannot deliver lectures", "A learned man is not interested in Calmuc Tartars", "A learned man is not aware of the optics and the rules of perspective"],
        correctAnswer: 0,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 64,
        question: "In the following question, the 1st and the last part of the sentence/passage are numbered 1 and 6. The rest of the sentence/passage is split into four parts and named P, Q, R, and S. These four parts are not given in their proper order. Read the sentence/passage and find out which of the four combinations is correct. 1. When he was a little boy, he lived on a farm in the country. P. He used to feed the chickens in the morning. Q. After lunch, it was too hot to work or play. R. It was his grandfather's vegetable farm. S. Then he played in the fields until noon. 6. So everyone took a nap for two or three hours.",
        options: ["PQSR", "RPQS", "PSRQ", "RPSQ"],
        correctAnswer: 3,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 65,
        question: "A sentence/a part of the sentence is underlined. Four alternatives are given to the underlined part which will improve the sentence. Choose the correct alternative. You are not taking your medicines, are you?",
        options: ["Were", "Aren't", "Isn't", "No improvement"],
        correctAnswer: 3,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 66,
        question: "I spoken the truth in front of my parents.",
        options: ["Will spoke", "Speaked", "Spoke", "Have spoke"],
        correctAnswer: 2,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 67,
        question: "The 4th day of admissions at the University started with most students cancelling their admissions as compared to new enrollments.",
        options: ["With many students", "With more students", "With all students", "No improvement"],
        correctAnswer: 1,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 68,
        question: "In the following question, out of the four alternatives, choose the word which is opposite in meaning to the given word: Slothful",
        options: ["Lively", "Sinful", "Lazy", "Unnatural"],
        correctAnswer: 0,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 69,
        question: "The primary objective of a socialist government is to the miseries of the poor.",
        options: ["Mollify", "Mitigate", "Soothe", "Abet"],
        correctAnswer: 1,
        section: "English Comprehension & Verbal Ability"
      },
      {
        id: 70,
        question: "In the question, out of the four alternatives, choose the word which is opposite in meaning to the given word: Haste",
        options: ["Soon", "Eventually", "Later", "Never"],
        correctAnswer: 2,
        section: "English Comprehension & Verbal Ability"
      }
    ];
    
    const computerQuestions: QuestionWithRequiredCorrectAnswer[] = [
      {
        id: 81,
        question: "A combination of hardware and software, which provides facilities of sending and receiving information between computer devices, is called:",
        options: ["Peripheral", "Expansion slot", "Network", "Server", "None of these"],
        correctAnswer: 2,
        section: "Computer Concepts"
      },
      {
        id: 82,
        question: "Who developed object-oriented programming?",
        options: ["Adele Goldberg", "Dennis Ritchie", "Alan Kay", "Andrea Ferro"],
        correctAnswer: 2,
        section: "Computer Concepts"
      },
      {
        id: 83,
        question: "The 0 and 1 in the binary numbering system are called Binary Digits or:",
        options: ["Bytes", "Kilobytes", "Decimal bytes", "Bits"],
        correctAnswer: 3,
        section: "Computer Concepts"
      },
      {
        id: 84,
        question: "What is Artificial Intelligence?",
        options: ["A field that aims to make humans more intelligent", "A field that aims to improve security", "A field that aims to develop intelligent machines", "A field that aims to mine data"],
        correctAnswer: 2,
        section: "Computer Concepts"
      },
      {
        id: 85,
        question: "A ______ is a collection of computers and devices connected together:",
        options: ["Network", "Protocol", "Memory card", "CPU", "None of these"],
        correctAnswer: 0,
        section: "Computer Concepts"
      },
      {
        id: 86,
        question: "Dennis was the author of the famous programming book ________.",
        options: ["C Programming and Techniques", "Thinking in C", "The C Programming Language", "Learn C Step by Step"],
        correctAnswer: 2,
        section: "Computer Concepts"
      },
      {
        id: 87,
        question: "What is the full form of 'AI'?",
        options: ["Artificially Intelligent", "Artificial Intelligence", "Artificially Intelligence", "Advanced"],
        correctAnswer: 1,
        section: "Computer Concepts"
      },
      {
        id: 88,
        question: "Which classes allow primitive types to be accessed as objects?",
        options: ["Storage", "Virtual", "Friend", "Wrapper"],
        correctAnswer: 3,
        section: "Computer Concepts"
      },
      {
        id: 89,
        question: "Which of the following languages was developed as the first purely object-oriented programming language?",
        options: ["Smalltalk", "C++", "Kotlin", "Java"],
        correctAnswer: 0,
        section: "Computer Concepts"
      },
      {
        id: 90,
        question: "Is Python case-sensitive when dealing with identifiers?",
        options: ["Yes", "No", "Machine dependent", "None of the mentioned"],
        correctAnswer: 0,
        section: "Computer Concepts"
      }
    ];
    
    // Combine all questions
    setQuestions([...mathQuestions, ...logicalQuestions, ...englishQuestions, ...computerQuestions]);
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
