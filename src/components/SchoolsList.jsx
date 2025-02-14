import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import schoolApi from '../services/schoolApi'; // This should work now
import SchoolEditor from './SchoolEditor'; // Import the SchoolEditor component

const SchoolsList = ({ onEditSchool }) => {
  const [schools, setSchools] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [refresh, setRefresh] = useState(false); // State to trigger fetch

  const fetchSchools = async () => {
    try {
      const response = await schoolApi.getAllSchools();
      if (response.code === 200 && Array.isArray(response.data)) {
        setSchools(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Failed to fetch schools", error);
    }
  };

  const handleEditSchool = (school) => {
    onEditSchool(school); // Call the passed function to edit the school
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setCurrentSchool(null);
  };

  useEffect(() => {
    fetchSchools(); // Fetch schools whenever refresh changes
  }, [refresh]); // Depend on refresh state

  const handleSchoolUpdated = () => {
    setRefresh(prev => !prev); // Toggle refresh state to trigger fetch
  };

  const handleDeleteSchool = async (schoolId) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      // Optimistically update the state
      setSchools(prevSchools => prevSchools.filter(school => school.id !== schoolId));

      try {
        await schoolApi.deleteSchoolById(schoolId); // Call delete function
        handleSchoolUpdated(); // Trigger refresh after deletion
      } catch (error) {
        console.error("Failed to delete school", error);
        // Optionally, you can revert the optimistic update if the delete fails
        fetchSchools(); // Re-fetch schools to restore the previous state
      }
    }
  };

  return (
    <div className="container w-full mx-auto p-4">
      <div className='w-full flex justify-between'>
        <h2 className="text-2xl font-bold">Schools</h2>
        <button
          onClick={() => handleEditSchool({})} // Open editor for new school
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New School
        </button>
      </div>
      <br />
      {schools.length === 0 ? (
        <div className="text-center text-gray-500">No schools found</div>
      ) : (
        <div className="flex flex-col gap-2">
          {schools.map((school) => (
            <div key={school.id} className="bg-white border flex gap-8 w-full h-fit rounded-md p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{school.schoolName}</h3>
              {/* <p className="text-gray-600 mb-1">{school.content}</p> */}
              <div className="flex justify-between gap-4 items-center">
                <button 
                  onClick={() => handleEditSchool(school)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleDeleteSchool(school.id)} // Use the new delete handler
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isEditing && (
        <SchoolEditor 
          school={currentSchool} 
          onClose={handleCloseEditor} 
          onSave={handleSchoolUpdated} // Trigger refresh after saving
        />
      )}
    </div>
  );
};

export default SchoolsList;
