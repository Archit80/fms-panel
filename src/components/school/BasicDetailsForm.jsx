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
  // const [selectedOption, setSelectedOption] = useState('');
  // const [image, setImage] = useState('');

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const schoolData = { schoolName, category, classesOffered, board, state, city, address};
    
  //   try {
  //     await schoolApi.createSchool(schoolData);
  //     onSave();
  //   } catch (error) {
  //     console.error("Error creating school:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ handleSubmit triggered");

    const schoolData = { schoolName, category, classesOffered, board, state, city, address };
    console.log("📤 Sending data:", schoolData);

    try {
       
            console.log("🚀 Calling schoolApi.createSchool...");
            const response = await schoolApi.createSchool(schoolData);
            console.log("✅ API Response:", response);

  

        await onSave(); 
        onClose();
    } catch (error) {
        console.error("❌ API Call Failed:", error);
    }
};

// const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const schoolData = { schoolName, category, classesOffered, board, state, city, address };

  //   console.log("Submitting school data:", schoolData);

  //   try {
  //       if (!school) {
  //           const response = await schoolApi.createSchool(schoolData);
  //           console.log("API Response:", response);

  //           if (response && response.status === 200) {
  //               console.log("School created successfully:", response.data);
  //           } else {
  //               console.error("Failed to create school:", response.data);
  //           }
  //       }
  //       await onSave(); // Refresh the list
  //       onClose(); // Close the editor
  //   } catch (error) {
  //       console.error("Failed to save school", error);
  //       if (error.response) {
  //           console.error("Error response data:", error.response.data);
  //           console.error("Error response status:", error.response.status);
  //       } else {
  //           console.error("Error message:", error.message);
  //       }
  //   }
  // };

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

          <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="border h-3/4 border-gray-300 rounded-md p-2 w-full mb-4"
          required
        >
          <option value="">Select Category</option>
          <option value="Day">Day</option>
          <option value="Day Boarding">Day Boarding</option>
          <option value="Boarding">Boarding</option>
          <option value="Play School">Play School</option>
        </select>
        </div>

        <div className="p-4 bg-white shadow-sm rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Classes Offered:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {["Nursery", "Pre-Primary", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((className) => (
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

        {/* <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required className="border text-center text-gray-800 border-gray-300 rounded-md p-2 w-full"/> */}

    
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
