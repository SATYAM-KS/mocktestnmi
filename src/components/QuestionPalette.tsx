
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
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          )}
        >
          All
        </button>
        {Object.keys(sectionedQuestions).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section as TestSection)}
            className={cn(
              "px-2 py-1 rounded transition-colors",
              activeSection === section 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
          >
            {section.split(' ')[0]}
          </button>
        ))}
      </div>
      
      {/* Section Title */}
      {activeSection !== 'all' && (
        <h4 className="text-sm font-medium mb-2 text-blue-600">
          {activeSection}
        </h4>
      )}
      
      {/* Question Numbers */}
      <div className="flex flex-wrap gap-2">
        {displayedQuestions.map((questionNumber) => (
          <button
            key={questionNumber}
            onClick={() => onQuestionSelect(questionNumber)}
            className={cn(
              'palette-number',
              questionStatuses[questionNumber] || 'unattempted',
              currentQuestion === questionNumber && 'ring-2 ring-nmiet-blue'
            )}
          >
            {questionNumber}
          </button>
        ))}
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-green-100 rounded-full mr-2"></div>
          <span>Attempted</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-orange-100 rounded-full mr-2"></div>
          <span>Seen but not attempted</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-gray-100 rounded-full mr-2"></div>
          <span>Not visited</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
