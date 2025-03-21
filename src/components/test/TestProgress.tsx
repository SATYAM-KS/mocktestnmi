
import React, { useState } from 'react';

interface SectionProgressData {
  total: number;
  attempted: number;
}

interface SectionProgress {
  [key: string]: SectionProgressData;
}

interface TestProgressProps {
  attemptedCount: number;
  totalQuestions: number;
  sectionProgress: SectionProgress;
  remainingCount: number;
}

const TestProgress: React.FC<TestProgressProps> = ({
  attemptedCount,
  totalQuestions,
  sectionProgress,
  remainingCount
}) => {
  const [showSummary, setShowSummary] = useState(false);
  
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <h3 className="text-lg font-medium mb-3">Test Progress</h3>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Overall Attempted</span>
        <span className="font-medium">{attemptedCount} / {totalQuestions}</span>
      </div>
      
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div 
          className="bg-nmiet-blue rounded-full h-2.5 transition-all duration-500"
          style={{ width: `${(attemptedCount / totalQuestions) * 100}%` }}
        ></div>
      </div>
      
      <button
        onClick={toggleSummary}
        className="mt-4 text-nmiet-blue hover:underline text-sm font-medium inline-flex items-center"
      >
        {showSummary ? 'Hide Summary' : 'Show Summary'}
      </button>
      
      {showSummary && (
        <div className="mt-3 text-sm space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-gray-700">Mathematics & Statistics</span>
              <span className="text-green-600">{sectionProgress['Mathematics & Statistics'].attempted}/{sectionProgress['Mathematics & Statistics'].total}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-green-500 rounded-full h-1.5"
                style={{ width: `${(sectionProgress['Mathematics & Statistics'].attempted / sectionProgress['Mathematics & Statistics'].total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-gray-700">Logical / Abstract Reasoning</span>
              <span className="text-purple-600">{sectionProgress['Logical / Abstract Reasoning'].attempted}/{sectionProgress['Logical / Abstract Reasoning'].total}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-purple-500 rounded-full h-1.5"
                style={{ width: `${(sectionProgress['Logical / Abstract Reasoning'].attempted / sectionProgress['Logical / Abstract Reasoning'].total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-gray-700">English Comprehension</span>
              <span className="text-blue-600">{sectionProgress['English Comprehension & Verbal Ability'].attempted}/{sectionProgress['English Comprehension & Verbal Ability'].total}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-blue-500 rounded-full h-1.5"
                style={{ width: `${(sectionProgress['English Comprehension & Verbal Ability'].attempted / sectionProgress['English Comprehension & Verbal Ability'].total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span className="text-gray-700">Computer Concepts</span>
              <span className="text-orange-600">{sectionProgress['Computer Concepts'].attempted}/{sectionProgress['Computer Concepts'].total}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-orange-500 rounded-full h-1.5"
                style={{ width: `${(sectionProgress['Computer Concepts'].attempted / sectionProgress['Computer Concepts'].total) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Not Attempted</span>
              <span className="font-medium text-red-600">{remainingCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestProgress;
