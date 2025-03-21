
import React from 'react';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface TestNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onOpenSubmitModal: () => void;
}

const TestNavigation: React.FC<TestNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrevQuestion,
  onNextQuestion,
  onOpenSubmitModal
}) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevQuestion}
        disabled={currentQuestionIndex === 0}
        className="button-secondary inline-flex items-center disabled:opacity-50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </button>
      
      <button
        onClick={onOpenSubmitModal}
        className="button-primary inline-flex items-center mx-2"
      >
        <Save className="mr-2 h-4 w-4" /> Submit Test
      </button>
      
      <button
        onClick={onNextQuestion}
        disabled={currentQuestionIndex === totalQuestions - 1}
        className="button-secondary inline-flex items-center disabled:opacity-50"
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};

export default TestNavigation;
