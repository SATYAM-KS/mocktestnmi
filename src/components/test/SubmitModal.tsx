
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  attemptedCount: number;
  totalQuestions: number;
  remainingCount: number;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  attemptedCount,
  totalQuestions,
  remainingCount
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-medium">Submit Test</h3>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">
          You have attempted {attemptedCount} out of {totalQuestions} questions. Are you sure you want to submit the test?
        </p>
        
        {remainingCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <p className="text-yellow-800 text-sm">
              You still have {remainingCount} unanswered questions.
            </p>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="button-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="button-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
