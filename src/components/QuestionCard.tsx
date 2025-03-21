
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
  section: string;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedOption: number | null;
  onOptionSelect: (optionIndex: number) => void;
}

const QuestionCard = ({
  question,
  questionNumber,
  selectedOption,
  onOptionSelect,
}: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center justify-center bg-nmiet-blue text-white text-sm font-medium rounded-full h-6 w-6">
          {questionNumber}
        </span>
        <span className="text-sm text-gray-500">{question.section}</span>
      </div>
      
      <h3 className="text-lg font-medium mb-6">{question.question}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => onOptionSelect(index)}
            className={cn(
              'question-option',
              selectedOption === index ? 'selected' : ''
            )}
          >
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <div className={cn(
                  'h-4 w-4 rounded-full border flex items-center justify-center',
                  selectedOption === index ? 'border-nmiet-blue bg-nmiet-blue/10' : 'border-gray-300'
                )}>
                  {selectedOption === index && (
                    <div className="h-2 w-2 rounded-full bg-nmiet-blue" />
                  )}
                </div>
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700 cursor-pointer">
                  {option}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
