
import React from 'react';
import { SectionedQuestion } from '@/components/QuestionPalette';

interface QuestionInfoProps {
  currentQuestionNumber: number;
  section: string;
}

const QuestionInfo: React.FC<QuestionInfoProps> = ({
  currentQuestionNumber,
  section
}) => {
  return (
    <div className="mb-4">
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-medium rounded-full text-sm">
        Section: {section}
      </span>
      <span className="ml-3 text-sm text-gray-500">
        Question {currentQuestionNumber} of 100
      </span>
    </div>
  );
};

export default QuestionInfo;
