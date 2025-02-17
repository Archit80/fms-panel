import React, { useState } from 'react';
import PropTypes from 'prop-types';
import schoolApi from '../../services/schoolApi';

const FeeForm = ({ school, onSave, onClose }) => {
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

  // Ensure classesOffered is defined
  const classesOffered = school?.classesOffered || [];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    // Reset fee fields when class changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await schoolApi.addClassDetail(school.id, classData);
      onSave(); // Refresh the list or perform any other action
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Failed to add class detail", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Fee Structure</h3>
      <div className="space-y-4">
        <select 
          value={selectedClass} 
          onChange={handleClassChange} 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        >
          <option value="">Select Class</option>
          {classesOffered.map((className) => (
            <option key={className} value={className}>{className}</option>
          ))}
        </select>

        <h4 className="text-md font-semibold">Registration Fees</h4>
        <div className='w-full flex gap-4'>
        <input 
          type="text" 
          value={registrationFees.fees} 
          onChange={(e) => setRegistrationFees({ ...registrationFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={registrationFees.frequency} 
          onChange={(e) => setRegistrationFees({ ...registrationFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
        <h4 className="text-md font-semibold">Admission Fees</h4>
        <div className='w-full flex gap-4'>
        <input 
          type="text" 
          value={admissionFees.fees} 
          onChange={(e) => setAdmissionFees({ ...admissionFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={admissionFees.frequency} 
          onChange={(e) => setAdmissionFees({ ...admissionFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
        <h4 className="text-md font-semibold">Tuition Fees</h4>
        <div className='w-full flex gap-4'>

        <input 
          type="text" 
          value={tuitionFees.fees} 
          onChange={(e) => setTuitionFees({ ...tuitionFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={tuitionFees.frequency} 
          onChange={(e) => setTuitionFees({ ...tuitionFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
        <h4 className="text-md font-semibold">Security Fees</h4>
        <div className='w-full flex gap-4'>

        <input 
          type="text" 
          value={securityFees.fees} 
          onChange={(e) => setSecurityFees({ ...securityFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={securityFees.frequency} 
          onChange={(e) => setSecurityFees({ ...securityFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
        <h4 className="text-md font-semibold">Annual Fees</h4>
        <div className='w-full flex gap-4'>

        <input 
          type="text" 
          value={annualFees.fees} 
          onChange={(e) => setAnnualFees({ ...annualFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={annualFees.frequency} 
          onChange={(e) => setAnnualFees({ ...annualFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        </div>
        <h4 className="text-md font-semibold">Others Fees</h4>
        <div className='w-full flex gap-4'>
        <input 
          type="text" 
          value={othersFees.fees}
          onChange={(e) => setOthersFees({ ...othersFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={othersFees.frequency} 
          onChange={(e) => setOthersFees({ ...othersFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
        <h4 className="text-md font-semibold">Transportation Fees</h4>
        <div className='w-full flex gap-4'>
        <input 
          type="text" 
          value={transportationFees.fees} 
          onChange={(e) => setTransportationFees({ ...transportationFees, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={transportationFees.frequency} 
          onChange={(e) => setTransportationFees({ ...transportationFees, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        </div>
        <h4 className="text-md font-semibold">Total Cost</h4>
        <div className='w-full flex gap-4'>
        <input 
          type="text" 
          value={totalCost.fees} 
          onChange={(e) => setTotalCost({ ...totalCost, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={totalCost.frequency} 
          onChange={(e) => setTotalCost({ ...totalCost, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        </div>
        <h4 className="text-md font-semibold">Monthly Cost</h4>
        <div className='w-full flex gap-4'>
        <input 
          type="text" 
          value={monthlyCost.fees} 
          onChange={(e) => setMonthlyCost({ ...monthlyCost, fees: e.target.value })} 
          placeholder="Fees" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
        <input 
          type="text" 
          value={monthlyCost.frequency} 
          onChange={(e) => setMonthlyCost({ ...monthlyCost, frequency: e.target.value })} 
          placeholder="Frequency" 
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
    </div>
        <div className="flex items-center">
          <label className="mr-4">Available:</label>
          <input 
            type="checkbox" 
            checked={available} 
            onChange={(e) => setAvailable(e.target.checked)} 
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-1/2 py-2 px-4 rounded">
        Save Fee Details
      </button>
    </form>
  );
};

FeeForm.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    classesOffered: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FeeForm;
