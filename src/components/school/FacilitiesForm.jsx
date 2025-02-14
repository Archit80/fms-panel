import React, { useState } from 'react';
import schoolApi from '../../services/schoolApi'; // Import the schoolApi
import PropTypes from 'prop-types';

const FacilitiesForm = ({ onSave, onClose, school }) => {
  const [classFacilities, setClassFacilities] = useState(school ? school.classFacilities : '');
  const [boarding, setBoarding] = useState(school ? school.boarding : '');
  const [infrastructure, setInfrastructure] = useState(school ? school.infrastructure : '');
  const [safety, setSafety] = useState(school ? school.safety : '');
  const [advanceFacilities, setAdvanceFacilities] = useState(school ? school.advanceFacilities : '');
  const [extraCurricular, setExtraCurricular] = useState(school ? school.extraCurricular : '');
  const [sports, setSports] = useState(school ? school.sports : '');
  const [lab, setLab] = useState(school ? school.lab : '');
  const [disabledFriendly, setDisabledFriendly] = useState(school ? school.disabledFriendly : 'no');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facilitiesData = {
      classFacilities,
      boarding,
      infrastructure,
      safety,
      advanceFacilities,
      extraCurricular,
      sports,
      lab,
      disabledFriendly,
    };

    console.log("Submitting facilities data:", facilitiesData);
    await schoolApi.updateFacilities(school.id, facilitiesData)
    onSave(); // Call onSave to refresh the list or perform any other action
    onClose(); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white h-full rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Facilities</h3>
      <div className="space-y-4">
        <input 
          type="text" 
          value={classFacilities} 
          onChange={(e) => setClassFacilities(e.target.value)} 
          placeholder="Class Facilities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <div className="flex items-center">
          <label className="mr-4">Boarding:</label>
          <select 
            value={boarding} 
            onChange={(e) => setBoarding(e.target.value)} 
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="na">N/A</option>
            <option value="girls">Girls Hostel</option>
            <option value="boys">Boys Hostel</option>
          </select>
        </div> 

        <input 
          type="text" 
          value={infrastructure} 
          onChange={(e) => setInfrastructure(e.target.value)} 
          placeholder="Infrastructure" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

     
        <input 
          type="text" 
          value={advanceFacilities} 
          onChange={(e) => setAdvanceFacilities(e.target.value)} 
          placeholder="Advanced Facilities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={extraCurricular} 
          onChange={(e) => setExtraCurricular(e.target.value)} 
          placeholder="Extracurricular Activities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={sports} 
          onChange={(e) => setSports(e.target.value)} 
          placeholder="Sports and Fitness" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={lab} 
          onChange={(e) => setLab(e.target.value)} 
          placeholder="Lab Facilities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={safety} 
          onChange={(e) => setSafety(e.target.value)} 
          placeholder="Safety and Security" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <div className="flex items-center">
          <label className="mr-4">Disabled Friendly:</label>
          <select 
            value={disabledFriendly} 
            onChange={(e) => setDisabledFriendly(e.target.value)} 
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-1/2 py-2 px-4 rounded">
        Save Facilities
      </button>
    </form>
  );
};

FacilitiesForm.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    classFacilities: PropTypes.string,
    boarding: PropTypes.string,
    infrastructure: PropTypes.string,
    safety: PropTypes.string,
    advanceFacilities: PropTypes.string,
    extraCurricular: PropTypes.string,
    sports: PropTypes.string,
    lab: PropTypes.string,
    disabledFriendly: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FacilitiesForm;
