import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuestionCard, { Question } from '@/components/QuestionCard';
import QuestionPalette, { TestSection, SectionedQuestion } from '@/components/QuestionPalette';
import TestHeader from '@/components/test/TestHeader';
import TestNavigation from '@/components/test/TestNavigation';
import TestProgress from '@/components/test/TestProgress';
import SubmitModal from '@/components/test/SubmitModal';
import QuestionInfo from '@/components/test/QuestionInfo';

const generateFullQuestionSet = (): (Question & SectionedQuestion)[] => {
  const sections: TestSection[] = [
    'Mathematics & Statistics',
    'Logical / Abstract Reasoning', 
    'English Comprehension & Verbal Ability',
    'Computer Concepts'
  ];
  
  const questions: (Question & SectionedQuestion)[] = [];
  
  for (let i = 1; i <= 30; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'Mathematics & Statistics'
    });
  }
  
  for (let i = 31; i <= 60; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'Logical / Abstract Reasoning'
    });
  }
  
  for (let i = 61; i <= 80; i++) {
    questions.push({
      id: i,
      question: `Question ${i}`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: Math.floor(Math.random() * 4),
      section: 'English Comprehension & Verbal Ability'
    });
  }
  
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
          <TestHeader 
            title="MCA Mock Test" 
            description="100 questions • 2 marks each • No negative marking • No time limit" 
          />
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow order-2 lg:order-1">
              <QuestionInfo 
                currentQuestionNumber={currentQuestionNumber} 
                section={currentQuestion.section} 
              />
              
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentQuestionNumber}
                selectedOption={userAnswers[currentQuestionNumber] !== undefined ? userAnswers[currentQuestionNumber] : null}
                onOptionSelect={handleOptionSelect}
              />
              
              <TestNavigation 
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onPrevQuestion={handlePrevQuestion}
                onNextQuestion={handleNextQuestion}
                onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
              />
            </div>
            
            <div className="lg:w-80 order-1 lg:order-2">
              <TestProgress 
                attemptedCount={attemptedCount}
                totalQuestions={questions.length}
                sectionProgress={sectionProgress}
                remainingCount={remainingCount}
              />
              
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
      
      <SubmitModal 
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleSubmitTest}
        attemptedCount={attemptedCount}
        totalQuestions={questions.length}
        remainingCount={remainingCount}
      />
      
      <Footer />
    </div>
  );
};

export default Test;
