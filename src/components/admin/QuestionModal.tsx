
import { Save, X } from 'lucide-react';

interface Section {
  id: string;
  name: string;
}

interface QuestionModalProps {
  title: string;
  question: {
    question: string;
    options: string[];
    correctAnswer: number;
    section: string;
  };
  setQuestion: React.Dispatch<React.SetStateAction<any>>;
  onSave: () => void;
  onClose: () => void;
  sections: Section[];
}

const QuestionModal = ({ 
  title, 
  question, 
  setQuestion, 
  onSave, 
  onClose, 
  sections 
}: QuestionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in overflow-y-auto py-10">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 animate-scale-in m-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <textarea
              value={question.question}
              onChange={(e) => setQuestion({...question, question: e.target.value})}
              rows={2}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
              placeholder="Enter the question"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  <input
                    type="radio"
                    checked={question.correctAnswer === index}
                    onChange={() => setQuestion({...question, correctAnswer: index})}
                    className="h-4 w-4 text-nmiet-blue focus:ring-nmiet-blue"
                  />
                  <span className="ml-1 text-sm text-gray-700">Correct</span>
                </div>
                <input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[index] = e.target.value;
                    setQuestion({...question, options: newOptions});
                  }}
                  className="flex-1 rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section
            </label>
            <select
              value={question.section}
              onChange={(e) => setQuestion({...question, section: e.target.value})}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
            >
              <option value="">Select a section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="button-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="button-primary inline-flex items-center"
          >
            <Save className="mr-2 h-4 w-4" /> {title === "Add New Question" ? "Save Question" : "Update Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
