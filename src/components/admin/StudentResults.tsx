
import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudentResult {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

interface StudentResultsProps {
  students: StudentResult[];
}

const StudentResults = ({ students }: StudentResultsProps) => {
  const [studentSearch, setStudentSearch] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-md focus:border-nmiet-blue focus:outline-none focus:ring-1 focus:ring-nmiet-blue w-full"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.score} / {student.totalQuestions * 2}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    student.percentage >= 70 ? "bg-green-100 text-green-800" :
                    student.percentage >= 40 ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  )}>
                    {student.percentage}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(student.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No student results found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResults;
