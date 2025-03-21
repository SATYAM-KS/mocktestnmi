
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, X, Save } from 'lucide-react';

interface Section {
  id: string;
  name: string;
}

interface Question {
  id: number;
  section: string;
  [key: string]: any;
}

interface SectionManagementProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  questions: Question[];
}

const SectionManagement = ({ sections, setSections, questions }: SectionManagementProps) => {
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSection, setNewSection] = useState('');

  const handleAddSection = () => {
    if (!newSection) {
      toast.error('Please enter a section name');
      return;
    }
    
    // Check if section already exists
    if (sections.some(s => s.name.toLowerCase() === newSection.toLowerCase())) {
      toast.error('Section already exists');
      return;
    }
    
    const newId = (parseInt(sections[sections.length - 1]?.id || '0') + 1).toString();
    
    setSections([
      ...sections,
      { id: newId, name: newSection }
    ]);
    
    setNewSection('');
    setShowAddSectionModal(false);
    toast.success('Section added successfully');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Test Sections</h2>
        <button
          onClick={() => setShowAddSectionModal(true)}
          className="button-primary inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-md p-4 flex justify-between items-center">
            <span className="font-medium">{section.name}</span>
            <span className="text-sm text-gray-500">
              {questions.filter(q => q.section === section.name).length} questions
            </span>
          </div>
        ))}
      </div>

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">Add New Section</h3>
              <button onClick={() => setShowAddSectionModal(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Name
              </label>
              <input
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue"
                placeholder="e.g., Data Structures"
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="button-primary inline-flex items-center"
              >
                <Save className="mr-2 h-4 w-4" /> Save Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionManagement;
