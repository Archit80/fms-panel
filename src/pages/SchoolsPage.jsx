import React, { useState } from 'react';
import SchoolsList from '../components/SchoolsList';
import SchoolEditor from '../components/SchoolEditor';
import { useAuth } from "../context/AuthContext";

const SchoolsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const { token } = useAuth(); // Get token from context


  const handleCloseEditor = () => {
    setIsEditing(false); // Close the editor
    setCurrentSchool(null); // Reset current school
  };

  return (
    (token)?(
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="w-full py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">FindMySchool Admin</h1>
          {/* <button
            onClick={handleAddNewSchool}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New School
          </button> */}
        </div>
      </header>

      <main className="flex-1">
        {isEditing ? (
          <SchoolEditor 
            school={currentSchool} 
            onClose={handleCloseEditor} 
            onSave={() => {
              handleCloseEditor();
            }} 
          />
        ) : (
          <SchoolsList 
            onEditSchool={(school) => {
              setCurrentSchool(school);
              setIsEditing(true);
            }} 
          />
        )}
      </main>
    </div>) : (
      <div className='flex h-screen w-full bg-white absolute z-20 left-0 justify-center items-center'>
         <h1 className='text-3xl font-bold'>You need to login to be able to access this page</h1>
      </div>
      )
  );
};

export default SchoolsPage;