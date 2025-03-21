
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type QuestionStatus = 'unattempted' | 'seen' | 'attempted';

interface QuestionPaletteProps {
  totalQuestions: number;
  questionStatuses: Record<number, QuestionStatus>;
  currentQuestion: number;
  onQuestionSelect: (questionNumber: number) => void;
}

const QuestionPalette = ({
  totalQuestions,
  questionStatuses,
  currentQuestion,
  onQuestionSelect,
}: QuestionPaletteProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-medium mb-3">Question Palette</h3>
      
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNumber) => (
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
