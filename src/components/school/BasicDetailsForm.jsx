import React, { useState } from 'react';
import schoolApi from '../../services/schoolApi'; // Import the schoolApi
import PropTypes from 'prop-types';

const BasicDetailsForm = ({ onSave, onClose, school }) => {
  const [schoolName, setSchoolName] = useState(school ? school.schoolName : '');
  const [category, setCategory] = useState(school ? school.category : '');
  const [board, setBoard] = useState(school ? school.board : '');
  const [state, setState] = useState(school ? school.state : '');
  const [city, setCity] = useState(school ? school.city : '');
  const [address, setAddress] = useState(school ? school.address : '');
  const [classesOffered, setClassesOffered] = useState(school && Array.isArray(school.classesOffered) ? school.classesOffered : []);
  const allClasses = ["Nursery", "Pre-Primary", "Class-1", "Class-2", "Class-3", "Class-4", "Class-5", "Class-6", "Class-7", "Class-8", "Class-9", "Class-10", "Class-11", "Class-12"];

  const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", 
    "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", 
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", 
    "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setClassesOffered((prev) => checked ? [...prev, value] : prev.filter((c) => c !== value));
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setClassesOffered(checked ? allClasses : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schoolData = { schoolName, category, classesOffered, board, state, city, address };

    try {
      await schoolApi.createSchool(schoolData);
      onSave();
    } catch (error) {
      console.error("Error creating school:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg flex justify-center flex-col bg-white w-full shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
      <div className="space-y-4 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="School Name" required className="border border-gray-300 rounded-md p-2 w-full"/>
          <select value={board} onChange={(e) => setBoard(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required>
            <option value="">Board</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="IGCSE">IGCSE</option>
            <option value="IB">IB</option>
            <option value="State">State Board</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border h-3/4 border-gray-300 rounded-md p-2 w-full mb-4" required>
            <option value="">Select Category</option>
            <option value="Day">Day</option>
            <option value="Day Boarding">Day Boarding</option>
            <option value="Boarding">Boarding</option>
            <option value="Play School">Play School</option>
          </select>
        </div>

        <div className="p-4 bg-white shadow-sm rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Classes Offered:</h4>
          <div className="flex items-center mb-2">
            <input 
              type="checkbox" 
              onChange={handleSelectAllChange} 
              checked={classesOffered.length === allClasses.length} 
            />
            <span className="ml-2">Select All</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {allClasses.map((className) => (
              <label key={className} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer">
                <input type="checkbox" value={className} checked={classesOffered.includes(className)} onChange={handleCheckboxChange} className="w-4 h-4 accent-blue-500"/>
                <span className="text-gray-700">{className}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select value={state} onChange={(e) => setState(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full" required>
            <option value="">Select State</option>
            {indianStates.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required className="border border-gray-300 rounded-md p-2 w-full"/>
        </div>

        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="border border-gray-300 rounded-md p-2 w-full h-32"/>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-1/2 py-2 px-4 rounded">
          Save Basic Details
        </button>
      </div>
    </form>
  );
};

BasicDetailsForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  school: PropTypes.object
};

export default BasicDetailsForm;
