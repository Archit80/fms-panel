import React, { useState, useEffect } from 'react';
import schoolApi from '../../services/schoolApi'; // Import the schoolApi
import PropTypes from 'prop-types';
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FacilitiesForm = ({ onSave, onClose, school }) => {
  const { token } = useAuth(); // Get token from context

  // Initialize state variables
  const [classFacilities, setClassFacilities] = useState('');
  const [boarding, setBoarding] = useState('');
  const [infrastructure, setInfrastructure] = useState('');
  const [safety, setSafety] = useState('');
  const [advanceFacilities, setAdvanceFacilities] = useState('');
  const [extraCurricular, setExtraCurricular] = useState('');
  const [sports, setSports] = useState('');
  const [lab, setLab] = useState('');
  const [disabledFriendly, setDisabledFriendly] = useState(false);

  // Effect to update state when school data changes
  useEffect(() => {
    if (school) {
      setClassFacilities(school.classFacilities || '');
      setBoarding(school.boarding || '');
      setInfrastructure(school.infrastructure || '');
      setSafety(school.safety || '');
      setAdvanceFacilities(school.advanceFacilities || '');
      setExtraCurricular(school.extraCurricular || '');
      setSports(school.sports || '');
      setLab(school.lab || '');
      setDisabledFriendly(school.disabledFriendly || false);
    }
  }, [school]); // Run whenever school changes

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
      disabledFriendly : Boolean(disabledFriendly),
    };

    try {
      await schoolApi.updateFacilities(token, school.id, facilitiesData);
      toast.success("Facilities successfully updated!");
      // onSave(); // Refresh the list or perform any other action
      // onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error updating facilities:", error);
      toast.error("Failed to update facilities. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white h-full rounded-lg shadow p-6">
      <ToastContainer position="top-right" autoClose={5000} />

      <h3 className="text-lg font-semibold mb-4">Facilities</h3>
      <div className="space-y-4">
        <input 
          type="text" 
          required
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
          required
          value={infrastructure} 
          onChange={(e) => setInfrastructure(e.target.value)} 
          placeholder="Infrastructure" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          required
          value={advanceFacilities} 
          onChange={(e) => setAdvanceFacilities(e.target.value)} 
          placeholder="Advanced Facilities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          required
          value={extraCurricular} 
          onChange={(e) => setExtraCurricular(e.target.value)} 
          placeholder="Extracurricular Activities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={sports} 
          required
          onChange={(e) => setSports(e.target.value)} 
          placeholder="Sports and Fitness" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          value={lab} 
          required
          onChange={(e) => setLab(e.target.value)} 
          placeholder="Lab Facilities" 
          className="border border-gray-300 rounded-md p-2 w-full"
        />

        <input 
          type="text" 
          required
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
            <option value= {true} >Yes</option>
            <option value={false}>No</option>
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
