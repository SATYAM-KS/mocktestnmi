
import { cn } from '@/lib/utils';

interface TabsNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabsNav = ({ activeTab, onTabChange }: TabsNavProps) => {
  return (
    <div className="border-t border-b">
      <div className="flex overflow-x-auto">
        <button
          onClick={() => onTabChange('questions')}
          className={cn(
            "px-6 py-3 text-sm font-medium whitespace-nowrap",
            activeTab === 'questions' 
              ? "border-b-2 border-nmiet-blue text-nmiet-blue" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Questions
        </button>
        <button
          onClick={() => onTabChange('sections')}
          className={cn(
            "px-6 py-3 text-sm font-medium whitespace-nowrap",
            activeTab === 'sections' 
              ? "border-b-2 border-nmiet-blue text-nmiet-blue" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Sections
        </button>
        <button
          onClick={() => onTabChange('results')}
          className={cn(
            "px-6 py-3 text-sm font-medium whitespace-nowrap",
            activeTab === 'results' 
              ? "border-b-2 border-nmiet-blue text-nmiet-blue" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Student Results
        </button>
      </div>
    </div>
  );
};

export default TabsNav;
