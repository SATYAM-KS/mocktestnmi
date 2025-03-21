
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type QuestionStatus = 'unattempted' | 'seen' | 'attempted';

// Define the test sections
export type TestSection = 'Mathematics & Statistics' | 'Logical / Abstract Reasoning' | 'English Comprehension & Verbal Ability' | 'Computer Concepts';

// Question with section information
export interface SectionedQuestion {
  id: number;
  section: TestSection;
}

interface QuestionPaletteProps {
  totalQuestions: number;
  questionStatuses: Record<number, QuestionStatus>;
  currentQuestion: number;
  onQuestionSelect: (questionNumber: number) => void;
  questions: SectionedQuestion[];
}

const QuestionPalette = ({
  totalQuestions,
  questionStatuses,
  currentQuestion,
  onQuestionSelect,
  questions,
}: QuestionPaletteProps) => {
  const [activeSection, setActiveSection] = useState<TestSection | 'all'>('all');
  
  // Group questions by section
  const sectionedQuestions = {
    'Mathematics & Statistics': questions.filter(q => q.section === 'Mathematics & Statistics').map(q => q.id),
    'Logical / Abstract Reasoning': questions.filter(q => q.section === 'Logical / Abstract Reasoning').map(q => q.id),
    'English Comprehension & Verbal Ability': questions.filter(q => q.section === 'English Comprehension & Verbal Ability').map(q => q.id),
    'Computer Concepts': questions.filter(q => q.section === 'Computer Concepts').map(q => q.id)
  };
  
  // Determine which questions to display based on active section
  const displayedQuestions = activeSection === 'all' 
    ? Array.from({ length: totalQuestions }, (_, i) => i + 1)
    : sectionedQuestions[activeSection as TestSection];
  
  // Get custom section colors
  const getSectionColor = (section: TestSection | 'all'): string => {
    switch(section) {
      case 'Mathematics & Statistics':
        return 'bg-green-500 text-white';
      case 'Logical / Abstract Reasoning':
        return 'bg-purple-500 text-white';
      case 'English Comprehension & Verbal Ability':
        return 'bg-blue-500 text-white';
      case 'Computer Concepts':
        return 'bg-orange-500 text-white';
      case 'all':
      default:
        return 'bg-gray-800 text-white';
    }
  };
  
  const getQuestionColorClass = (status: QuestionStatus, section: TestSection): string => {
    const baseClasses = "w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer";
    
    // First determine status color
    let statusClass = '';
    switch(status) {
      case 'attempted':
        return `${baseClasses} bg-green-100 text-green-800 border border-green-300`;
      case 'seen':
        return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-300`;
      case 'unattempted':
      default:
        statusClass = `${baseClasses} bg-gray-100 text-gray-800 border border-gray-300`;
    }
    
    return statusClass;
  };
  
  // Render section headers for the questions
  const renderSectionHeaders = () => {
    if (activeSection !== 'all') return null;
    
    // Find start and end indices for each section
    const sectionIndices = {
      'Mathematics & Statistics': {
        start: Math.min(...sectionedQuestions['Mathematics & Statistics']),
        end: Math.max(...sectionedQuestions['Mathematics & Statistics'])
      },
      'Logical / Abstract Reasoning': {
        start: Math.min(...sectionedQuestions['Logical / Abstract Reasoning']),
        end: Math.max(...sectionedQuestions['Logical / Abstract Reasoning'])
      },
      'English Comprehension & Verbal Ability': {
        start: Math.min(...sectionedQuestions['English Comprehension & Verbal Ability']),
        end: Math.max(...sectionedQuestions['English Comprehension & Verbal Ability'])
      },
      'Computer Concepts': {
        start: Math.min(...sectionedQuestions['Computer Concepts']),
        end: Math.max(...sectionedQuestions['Computer Concepts'])
      }
    };
    
    return (
      <div className="mb-3 space-y-1">
        {Object.entries(sectionIndices).map(([section, indices]) => (
          <div 
            key={section} 
            className="flex items-center text-xs"
          >
            <div className={`w-3 h-3 rounded-full mr-2 ${getSectionColor(section as TestSection).replace('bg-', 'bg-').replace('text-white', '')}`}></div>
            <span className="text-gray-700">{section} ({indices.start}-{indices.end})</span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-medium mb-3">Question Palette</h3>
      
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-1 mb-4 text-xs">
        <button
          onClick={() => setActiveSection('all')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            activeSection === 'all' 
              ? "bg-gray-800 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          )}
        >
          All
        </button>
        <button
          onClick={() => setActiveSection('Mathematics & Statistics')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            activeSection === 'Mathematics & Statistics' 
              ? "bg-green-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          )}
        >
          Math
        </button>
        <button
          onClick={() => setActiveSection('Logical / Abstract Reasoning')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            activeSection === 'Logical / Abstract Reasoning' 
              ? "bg-purple-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          )}
        >
          Logic
        </button>
        <button
          onClick={() => setActiveSection('English Comprehension & Verbal Ability')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            activeSection === 'English Comprehension & Verbal Ability' 
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          )}
        >
          English
        </button>
        <button
          onClick={() => setActiveSection('Computer Concepts')}
          className={cn(
            "px-2 py-1 rounded transition-colors",
            activeSection === 'Computer Concepts' 
              ? "bg-orange-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          )}
        >
          Computer
        </button>
      </div>
      
      {/* Section Title */}
      {activeSection !== 'all' && (
        <h4 className={`text-sm font-medium mb-2 ${
          activeSection === 'Mathematics & Statistics' 
            ? 'text-green-600' 
            : activeSection === 'Logical / Abstract Reasoning' 
              ? 'text-purple-600' 
              : activeSection === 'English Comprehension & Verbal Ability' 
                ? 'text-blue-600' 
                : 'text-orange-600'
        }`}>
          {activeSection}
        </h4>
      )}
      
      {/* Section Headers (only in All view) */}
      {renderSectionHeaders()}
      
      {/* Question Numbers */}
      <div className="flex flex-wrap gap-2">
        {displayedQuestions.map((questionNumber) => {
          const section = questions.find(q => q.id === questionNumber)?.section || 'Mathematics & Statistics';
          
          return (
            <button
              key={questionNumber}
              onClick={() => onQuestionSelect(questionNumber)}
              className={cn(
                getQuestionColorClass(questionStatuses[questionNumber] || 'unattempted', section as TestSection),
                currentQuestion === questionNumber && 'ring-2 ring-nmiet-blue'
              )}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-green-100 rounded-full mr-2 border border-green-300"></div>
          <span>Attempted</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-orange-100 rounded-full mr-2 border border-orange-300"></div>
          <span>Seen but not attempted</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-gray-100 rounded-full mr-2 border border-gray-300"></div>
          <span>Not visited</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
