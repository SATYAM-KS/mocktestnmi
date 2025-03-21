
import { useState, useEffect } from 'react';
import { X, Save, Plus, Minus } from 'lucide-react';
import { Question } from '@/components/QuestionCard';

type QuestionWithRequiredCorrectAnswer = Omit<Question, 'correctAnswer'> & {
  correctAnswer: number;
};

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: QuestionWithRequiredCorrectAnswer) => void;
  question: QuestionWithRequiredCorrectAnswer | null;
  sections: { id: string; name: string }[];
}

const QuestionModal = ({ isOpen, onClose, onSave, question, sections }: QuestionModalProps) => {
  const [formData, setFormData] = useState<QuestionWithRequiredCorrectAnswer>({
    id: 0,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    section: sections[0]?.name || '',
  });

  useEffect(() => {
    if (question) {
      setFormData({
        ...question,
        // Ensure options array has at least 4 items
        options: [...question.options, ...Array(Math.max(0, 4 - question.options.length)).fill('')].slice(0, 4)
      });
    } else {
      setFormData({
        id: 0,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        section: sections[0]?.name || '',
      });
    }
  }, [question, sections]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleAddOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
    }
  };

  const handleRemoveOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      
      // If we're removing the correct answer or an option before it, adjust correctAnswer
      let newCorrectAnswer = formData.correctAnswer;
      if (index === formData.correctAnswer) {
        newCorrectAnswer = 0; // Default to first option if correct one is removed
      } else if (index < formData.correctAnswer) {
        newCorrectAnswer--;
      }
      
      setFormData(prev => ({ 
        ...prev, 
        options: newOptions,
        correctAnswer: newCorrectAnswer
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.question.trim()) {
      alert('Please enter a question');
      return;
    }
    
    if (formData.options.some(option => !option.trim())) {
      alert('Please fill in all options');
      return;
    }
    
    if (formData.correctAnswer === undefined || formData.correctAnswer === null) {
      alert('Please select a correct answer');
      return;
    }
    
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">
            {question ? 'Edit Question' : 'Add New Question'}
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue min-h-[100px]"
              placeholder="Enter the question text here..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Options
              </label>
              {formData.options.length < 6 && (
                <button 
                  type="button"
                  onClick={handleAddOption}
                  className="text-xs text-nmiet-blue hover:text-nmiet-darkblue flex items-center"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Option
                </button>
              )}
            </div>
            
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === index}
                  onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                  className="h-4 w-4 text-nmiet-blue focus:ring-nmiet-blue border-gray-300 mr-3"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                />
                {formData.options.length > 2 && (
                  <button 
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary inline-flex items-center"
            >
              <Save className="mr-2 h-4 w-4" /> Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
