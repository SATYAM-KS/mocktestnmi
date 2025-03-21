
import { useState } from 'react';
import { toast } from 'sonner';
import { Pencil, Trash, Plus } from 'lucide-react';
import { Question } from '@/components/QuestionCard';
import QuestionModal from './QuestionModal';

type QuestionWithRequiredCorrectAnswer = Omit<Question, 'correctAnswer'> & {
  correctAnswer: number;
};

interface QuestionManagementProps {
  questions: QuestionWithRequiredCorrectAnswer[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionWithRequiredCorrectAnswer[]>>;
  sections: { id: string; name: string }[];
}

const QuestionManagement = ({ questions, setQuestions, sections }: QuestionManagementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithRequiredCorrectAnswer | null>(null);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddQuestion = () => {
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question: QuestionWithRequiredCorrectAnswer) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== questionId));
      toast.success('Question deleted successfully');
    }
  };

  const handleSaveQuestion = (question: QuestionWithRequiredCorrectAnswer) => {
    if (currentQuestion) {
      // Edit existing question
      setQuestions(questions.map(q => q.id === question.id ? question : q));
      toast.success('Question updated successfully');
    } else {
      // Add new question
      const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
      setQuestions([...questions, { ...question, id: newId }]);
      toast.success('Question added successfully');
    }
    setIsModalOpen(false);
  };

  const filteredQuestions = questions
    .filter(q => selectedSectionFilter === 'all' || q.section === selectedSectionFilter)
    .filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalQuestions = questions.length;
  const filteredCount = filteredQuestions.length;

  // Calculate section stats
  const sectionStats = sections.map(section => ({
    name: section.name,
    count: questions.filter(q => q.section === section.name).length
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Test Questions</h2>
        <button
          onClick={handleAddQuestion}
          className="button-primary inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </button>
      </div>
      
      <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
        <div className="text-sm text-gray-600 mb-2">Total Questions: {totalQuestions}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          {sectionStats.map((stat) => (
            <div key={stat.name} className="bg-gray-50 p-2 rounded border text-center">
              <div className="text-xs text-gray-500">{stat.name}</div>
              <div className="font-semibold">{stat.count}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
          />
        </div>
        <div>
          <select
            value={selectedSectionFilter}
            onChange={(e) => setSelectedSectionFilter(e.target.value)}
            className="rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue w-full md:w-auto"
          >
            <option value="all">All Sections</option>
            {sections.map((section) => (
              <option key={section.id} value={section.name}>{section.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredCount === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500">No questions found matching your criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.id}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      <div className="max-w-md truncate">{question.question}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="text-nmiet-blue hover:text-nmiet-darkblue mr-3"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {isModalOpen && (
        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuestion}
          question={currentQuestion}
          sections={sections}
        />
      )}
    </div>
  );
};

export default QuestionManagement;
