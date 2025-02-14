import React from 'react';

const EligibilityForm = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
      <div className="space-y-4">
        <textarea 
          placeholder="Admission Process" 
          className="border border-gray-300 rounded-md p-2 w-full h-32"
        />
        <input 
          type="text" 
          placeholder="Minimum Age Requirement" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <input 
          type="text" 
          placeholder="Previous Education Requirements" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    </div>
  );
};

export default EligibilityForm;
