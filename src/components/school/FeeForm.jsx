import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import schoolApi from '../../services/schoolApi';
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeeForm = ({ school, onSave }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [registrationFees, setRegistrationFees] = useState({ fees: '', frequency: '' });
  const [admissionFees, setAdmissionFees] = useState({ fees: '', frequency: '' });
  const [tuitionFees, setTuitionFees] = useState({ fees: '', frequency: '' });
  const [securityFees, setSecurityFees] = useState({ fees: '', frequency: '' });
  const [annualFees, setAnnualFees] = useState({ fees: '', frequency: '' });
  const [othersFees, setOthersFees] = useState({ fees: '', frequency: '' });
  const [transportationFees, setTransportationFees] = useState({ fees: '', frequency: '' });
  const [totalCost, setTotalCost] = useState({ fees: '', frequency: '' });
  const [monthlyCost, setMonthlyCost] = useState({ fees: '', frequency: '' });
  const [available, setAvailable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { token } = useAuth();
  const classesOffered = school?.classesOffered || [];

  const fetchClassDetails = async (className) => {
    try {
      const response = await schoolApi.getClassDetails(token, school.id, className);
      const data = response.data || {};

      setRegistrationFees(data.registrationFees || { fees: '', frequency: '' });
      setAdmissionFees(data.admissionFees || { fees: '', frequency: '' });
      setTuitionFees(data.tuitionFees || { fees: '', frequency: '' });
      setSecurityFees(data.securityFees || { fees: '', frequency: '' });
      setAnnualFees(data.annualFees || { fees: '', frequency: '' });
      setOthersFees(data.othersFees || { fees: '', frequency: '' });
      setTransportationFees(data.transportationFees || { fees: '', frequency: '' });
      setTotalCost(data.totalCost || { fees: '', frequency: '' });
      setMonthlyCost(data.monthlyCost || { fees: '', frequency: '' });
      setAvailable(data.available ?? true);
      setIsEditing(true); // Class exists, so we update it
    } catch (error) {
      console.error("Failed to fetch class details:", error.response?.data || error.message);
      
      setIsEditing(false); // Class does not exist, so we add a new one

      if (error.response?.status === 404) {
        setRegistrationFees({ fees: '', frequency: '' });
        setAdmissionFees({ fees: '', frequency: '' });
        setTuitionFees({ fees: '', frequency: '' });
        setSecurityFees({ fees: '', frequency: '' });
        setAnnualFees({ fees: '', frequency: '' });
        setOthersFees({ fees: '', frequency: '' });
        setTransportationFees({ fees: '', frequency: '' });
        setTotalCost({ fees: '', frequency: '' });
        setMonthlyCost({ fees: '', frequency: '' });
        setAvailable(true);
      }
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchClassDetails(selectedClass);
    }
  }, [selectedClass]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass.trim()) {
      toast.error("Error: Please select a class!");
      return;
    }

    const classData = {
      className: selectedClass,
      registrationFees,
      admissionFees,
      tuitionFees,
      securityFees,
      annualFees,
      othersFees,
      transportationFees,
      totalCost,
      monthlyCost,
      available,
    };

    try {
      if (isEditing) {
        await schoolApi.updateClassDetail(token, school.id, classData, selectedClass);
        toast.success(`Class details for ${selectedClass} updated successfully!`);
        console.log(`Class details for ${selectedClass} updated successfully! ->` , classData);
      } else {
        await schoolApi.addClassDetail(token, school.id, classData);
        toast.success(`Class details for ${selectedClass} added successfully!`);
        // toast.success("Class details added successfully!");
        console.log(`Class details for ${selectedClass} added successfully! ->` , classData);
      }
      
      // onSave(); // ✅ Call onSave but DO NOT call onClose
    } catch (error) {
      console.error("Failed to save class details", error);
      toast.error("Failed to save class details!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <ToastContainer position="top-right" autoClose={5000}  />

      <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Fee Structure" : "Add Fee Structure"}</h3>

      <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border p-2 w-full" required>
        <option value="">Select Class</option>
        {classesOffered.map((className) => (
          <option key={className} value={className}>{className}</option>
        ))}
      </select>

      {[
        { label: "Registration Fees", state: registrationFees, setter: setRegistrationFees },
        { label: "Admission Fees", state: admissionFees, setter: setAdmissionFees },
        { label: "Tuition Fees", state: tuitionFees, setter: setTuitionFees },
        { label: "Security Fees", state: securityFees, setter: setSecurityFees },
        { label: "Annual Fees", state: annualFees, setter: setAnnualFees },
        { label: "Other Fees", state: othersFees, setter: setOthersFees },
        { label: "Transportation Fees", state: transportationFees, setter: setTransportationFees },
        { label: "Total Cost", state: totalCost, setter: setTotalCost },
        { label: "Monthly Cost", state: monthlyCost, setter: setMonthlyCost }
      ].map(({ label, state, setter }) => (
        <div key={label} className="mb-4">
          <h4 className="text-md font-semibold">{label}</h4>
          <div className='flex gap-4'>
            <input 
              type="text" 
              value={state.fees} 
              onChange={(e) => setter({ ...state, fees: e.target.value })} 
              placeholder="Fees" 
              className="border p-2 w-full"
              required
            />
            <input 
              type="text" 
              value={state.frequency} 
              onChange={(e) => setter({ ...state, frequency: e.target.value })} 
              placeholder="Frequency (e.g. Monthly, Yearly)" 
              className="border p-2 w-full"
              required
            />
          </div>
        </div>
      ))}

      <div className="flex items-center">
        <label className="mr-4">Available:</label>
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-1/2 py-2 px-4 rounded">
          {isEditing ? "Update Fee Details" : "Save Fee Details"}
        </button>
      </div>
    </form>
  );
};

FeeForm.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    classesOffered: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default FeeForm;
