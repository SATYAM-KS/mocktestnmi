
import React from 'react';

interface TestHeaderProps {
  title: string;
  description: string;
}

const TestHeader: React.FC<TestHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TestHeader;
