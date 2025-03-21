
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash, Edit, Save, X, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Question } from '@/components/QuestionCard';
import QuestionModal from './QuestionModal';

interface Section {
  id: string;
  name: string;
}

interface QuestionManagementProps {
  questions: Question[];
  sections: Section[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionManagement = ({ questions, sections, setQuestions }: QuestionManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    section: '',
  });

  const handleAddQuestion = () => {
    // Validate form
    if (!newQuestion.question || newQuestion.options.some(option => !option) || !newQuestion.section) {
      toast.error('Please fill all fields');
      return;
    }
    
    // Add new question
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    setQuestions([
      ...questions,
      {
        id: newId,
        question: newQuestion.question,
        options: [...newQuestion.options],
        correctAnswer: newQuestion.correctAnswer,
        section: newQuestion.section
      }
    ]);
    
    // Reset form
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      section: '',
    });
    
    setShowAddQuestionModal(false);
    toast.success('Question added successfully');
  };
  
  const handleUpdateQuestion = () => {
    if (!editingQuestion) return;
    
    // Update question
    setQuestions(
      questions.map(q => 
        q.id === editingQuestion.id ? editingQuestion : q
      )
    );
    
    setEditingQuestion(null);
    toast.success('Question updated successfully');
  };
  
  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success('Question deleted successfully');
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'all' || question.section === sectionFilter;
    
    return matchesSearch && matchesSection;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-md focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue w-full sm:w-auto"
            />
          </div>
          
          <div className="ml-2">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-md focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue appearance-none"
            >
              <option value="all">All Sections</option>
              {sections.map((section) => (
                <option key={section.id} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
            <Filter className="relative inline-flex -ml-6 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <button
          onClick={() => setShowAddQuestionModal(true)}
          className="button-primary inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </button>
      </div>
      
      {filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500">{question.section}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingQuestion(question)}
                    className="p-1 rounded-md text-gray-500 hover:text-nmiet-blue hover:bg-nmiet-blue/10"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-base font-medium mb-2">{question.question}</h3>
              
              <div className="space-y-2 ml-4">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className={cn(
                        "h-4 w-4 rounded-full mr-2 flex items-center justify-center",
                        index === question.correctAnswer 
                          ? "bg-green-100 text-green-600 border border-green-600" 
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      )}
                    >
                      {index === question.correctAnswer && (
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      index === question.correctAnswer ? "text-green-600 font-medium" : "text-gray-600"
                    )}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No questions found matching your search criteria.</p>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddQuestionModal && (
        <QuestionModal
          title="Add New Question"
          question={newQuestion}
          setQuestion={setNewQuestion as any}
          onSave={handleAddQuestion}
          onClose={() => setShowAddQuestionModal(false)}
          sections={sections}
        />
      )}
      
      {/* Edit Question Modal */}
      {editingQuestion && (
        <QuestionModal
          title="Edit Question"
          question={editingQuestion}
          setQuestion={setEditingQuestion as any}
          onSave={handleUpdateQuestion}
          onClose={() => setEditingQuestion(null)}
          sections={sections}
        />
      )}
    </div>
  );
};

export default QuestionManagement;
